'use client';

import { useCart } from '@/hook/UseCart';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react'

const page = () => {
  const {cart, totalAmount, clearCart} = useCart()
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
    paymentMethod: "cod"
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null); 
  const [preview, setPreview] = useState<string | null>(null);

   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => { if (e.target.files && e.target.files[0]) { setPaymentProof(e.target.files[0]); setPreview(URL.createObjectURL(e.target.files[0])); } };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      setStatus("Your cart is empty.");
      return;
    }

    setStatus("Sending...");
    setLoading(true);

    const data = {
      items: cart.map((item) => ({
        name: item.name,
        price: item.price,
        onSale: item.onSale,
        salePrice: item.salePrice,
        quantity: item.quantity,
        image: item.image,
        selectedSize: item.selectedSize,
        sku: item.sku,
        personlized: item.personlized
      })),
      totalPrice: totalAmount,
      userDetails: {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
      },
      notes: formData.notes || "No Notes",
      shippingAddress: {
        city: formData.city,
        postalCode: formData.postalCode || "No Postal Code",
        address: formData.address,
      },
      paymentMethod: formData.paymentMethod,
    };


    const formDataToSend = new FormData();
    if(paymentProof){
      formDataToSend.append("paymentProof", paymentProof);
    }
    formDataToSend.append("orderData", JSON.stringify(data));

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/order`,
        formDataToSend,{ headers: { "Content-Type": "multipart/form-data" } }
      );

      setStatus("Order placed successfully!");

      clearCart()

      // redirect to thank you page
      router.push(`/thank-you/${res.data.order._id}`);
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='grid grid-cols-1 md:grid-cols-2 min-h-screen lg:grid-cols-3 max-w-8xl mx-auto'>
      <section className='col-span-2'>
         <div className="pt-5 border-r h-full lg:pl-20 pl-5 pr-5 border-gray-300 ">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
          >
            <div className="space-y-4">
              <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="border-gray-300 outline-none w-full p-3 border rounded-md"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={handleChange}
                className="border-gray-300 outline-none w-full p-3 border rounded-md"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border-gray-300 outline-none w-full p-3 border rounded-md"
              />
              <input
                name="city"
                type="text"
                placeholder="City"
                required
                value={formData.city}
                onChange={handleChange}
                className="border-gray-300 outline-none w-full p-3 border rounded-md"
              />
            </div>

            <div className="space-y-4">
              <input
                name="address"
                placeholder="Full Address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full border-gray-300 outline-none p-3 border rounded-md"
              />
              <input
                name="postalCode"
                type="text"
                placeholder="Postal Code (optional)"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full p-3 border-gray-300 outline-none border rounded-md"
              />
              <textarea
                name="notes"
                placeholder="Order Notes (optional)"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-3 border-gray-300 outline-none border rounded-md"
              />
            </div>
           <div className="border rounded-lg p-4 md:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Payment Method</p>
              <select
                value={formData.paymentMethod}
                onChange={handleChange}
                name="paymentMethod"
                className="text-sm border rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="cod">Cash on Delivery</option>
                <option value="easypaisa">Easypaisa</option>
              </select>
            </div>

            {formData.paymentMethod === "easypaisa" && (
              <div className="border-t pt-3 space-y-3">
                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="text-gray-500">Number:</span> 03339941336
                  </p>
                  <p>
                    <span className="text-gray-500">Account Name:</span> Muhammad Hashir Khan
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Upload Payment Screenshot
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border file:border-gray-300 file:bg-white file:text-sm hover:file:bg-gray-50"
                  />
                </div>

                {preview && (
                  <div>
                    <Image
                      src={preview}
                      alt="Payment proof"
                      width={160}
                      height={160}
                      className="rounded-md border object-cover"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className={`md:col-span-2 w-full cursor-pointer text-white py-3 rounded-md transition ${
                loading ? "bg-gray-600" : "bg-black hover:bg-gray-800"
              }`}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          {status && (
            <p className="my-3 text-center text-black font-medium">{status}</p>
          )}
        </div>
      </section>
      <section className="col-span-1">
        <div className="w-full h-full bg-gray-100 p-6">
          <h3 className="text-xl font-semibold mb-4">Your Cart</h3>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div className="flex gap-5">
                    {item.image ? (
                      <Image
                        width={100}
                        height={100}
                        className="w-[70px] h-[70px] object-cover rounded"
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <div className="w-[70px] h-[70px] bg-gray-200 flex items-center justify-center text-xs">
                        No Img
                      </div>
                    )}
                    <div>
                      <p className="font-medium capitalize">{item.name} - {item.selectedSize} ml</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm text-gray-600">personalized: {item.personlized || "YOU"}</p>
                    </div>
                  </div>
                  <p className="font-medium">{item.onSale ? item.salePrice! * item.quantity : item.price * item.quantity} PKR</p>
                </div>
              ))}

              
              <div className="flex justify-between mt-4 font-bold text-lg">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between mt-4 font-bold text-lg">
                <span>Total:</span>
                <span>{totalAmount} PKR</span>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default page
