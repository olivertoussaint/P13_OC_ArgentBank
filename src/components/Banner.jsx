import bankTreeImage from '../assets/img/bank-tree.jpeg'

function Banner() {
  return (
    <div 
      className='relative h-80 sm:h-96 md:h-[30rem] bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: `url(${bankTreeImage})`,
      }}
      >
      <section className="heroContent absolute top-3.125rem right-0 md:right-3.125rem md:p-10 m-8 w-48 sm:w-52 md:w-81 text-left bg-slate-50/50 rounded sm:rounded-none sm:bg-white dark:bg-dark">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="font-bold text-sm md:text-2xl  text-dark dark:text-white">No fees.</p>
            <p className="font-bold text-sm md:text-2xl text-dark dark:text-white">No minimum deposit.</p>
            <p className="font-bold text-sm md:text-2xl text-dark dark:text-white">High interest rates.</p>
            <p className="md:text-xl  mt-3 md:mt-1.1875rem [text-shadow:_0_2px_4px_rgb(99_102_241_/_0.8)]  text-gray-950 leading-snug md:[text-shadow:_0_0] md:text-dark dark:text-white">Open savings account with Argent Bank today!</p>
          </section>
    </div>
  )
}

export default Banner