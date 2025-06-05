function Hero() {
  return (
    <div className="relative h-screen w-full">
      {/* Immagine di sfondo opacizzata */}
      <img
        src="/hero-desktop.png"
        alt="Hero"
        className="-mt-14 absolute inset-0 w-full h-full object-cover opacity-35"
      />


    </div>
  )
}

export default Hero
