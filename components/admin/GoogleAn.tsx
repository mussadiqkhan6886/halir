import Script from "next/script"

const GoogleAn = () => {
  return (
    <>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-YEKTG0Z2P9" strategy="afterInteractive"/>
        <Script id='google-analytics' strategy="afterInteractive">
       {` window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-YEKTG0Z2P9');`}
        </Script>
    </>

  )
}

export default GoogleAn
