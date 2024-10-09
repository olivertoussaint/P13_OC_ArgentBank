import Banner from "@banner"
import Item from "../components/Item"
import FeaturesItemData from "../data/FeaturesItemData.json"
import iconChat from "@icons/icon-chat.png"
import iconMoney from "@icons/icon-money.png"
import iconSecurity from "@icons/icon-security.png"
import'../index.css'

function Home() {
  const imageData = {
    "icon-chat.png": iconChat,
    "icon-money.png": iconMoney,
    "icon-security.png": iconSecurity,
  }

  return (
    <>
    <main className="dark:bg-gray-900 dark:text-white">
      <Banner />
      <div className="hero">
        <section className="features bg-white dark:bg-dark">
          <h2 className="sr-only">Features</h2>
          {FeaturesItemData.map((data) => (
            < Item
            key={data.id}
            image={imageData[data.image]}
            descriptionImage={data.descriptionImage}
            title={data.title}
            description={data.description}
            />
          ))}
        </section>
      </div>
    </main>
    </>
  )
}

export default Home
