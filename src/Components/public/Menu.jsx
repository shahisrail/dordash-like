"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { FaStar, FaClock, FaMapMarkerAlt, FaPlus, FaMinus, FaShoppingCart, FaHeart } from "react-icons/fa"

const Menu = () => {
  const { restaurantId } = useParams()
  const [menuData, setMenuData] = useState(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [cart, setCart] = useState({})
  const [favorites, setFavorites] = useState(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/public/menu/${restaurantId}`)
        setMenuData(res.data)
        if (res.data.menu.length > 0) {
          setSelectedCategoryId(res.data.menu[0]._id)
        }
      } catch (error) {
        console.error("Error loading menu", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [restaurantId])

  const addToCart = (item) => {
    setCart((prev) => ({
      ...prev,
      [item._id]: (prev[item._id] || 0) + 1,
    }))
  }

  const removeFromCart = (itemId) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[itemId] > 1) {
        newCart[itemId]--
      } else {
        delete newCart[itemId]
      }
      return newCart
    })
  }

  const toggleFavorite = (itemId) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId)
    } else {
      newFavorites.add(itemId)
    }
    setFavorites(newFavorites)
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }

  const getTotalPrice = () => {
    let total = 0
    menuData?.menu.forEach((category) => {
      category.subcategories.forEach((sub) => {
        sub.foodItems.forEach((item) => {
          if (cart[item._id]) {
            total += item.price * cart[item._id]
          }
        })
      })
    })
    return total
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-6 shimmer"></div>
            <div className="flex space-x-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-300 rounded-full w-32 shimmer"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="h-32 bg-gray-300 rounded-xl mb-4 shimmer"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2 shimmer"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 shimmer"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!menuData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Menu Not Found</h2>
          <p className="text-gray-500">Sorry, we couldn't load the menu for this restaurant.</p>
        </div>
      </div>
    )
  }

  const categories = menuData.menu

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="animate-fadeInUp">
            <h1 className="text-4xl font-bold mb-4">{menuData.restaurant} 🍽️</h1>
            <div className="flex flex-wrap items-center gap-6 text-orange-100">
              <div className="flex items-center">
                <FaStar className="mr-2 text-yellow-300" />
                <span>4.5 (120+ reviews)</span>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2" />
                <span>25-30 min delivery</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span>Free delivery on orders over $20</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Menu Content */}
          <div className="flex-1">
            {/* Category Buttons */}
            {categories.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🍽️</div>
                <h3 className="text-2xl font-bold text-gray-600 mb-2">No Menu Available</h3>
                <p className="text-gray-500">This restaurant hasn't added their menu yet.</p>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-3 mb-8 sticky top-20 bg-gray-50 py-4 z-10">
                  {categories.map((category, index) => (
                    <button
                      key={category._id}
                      onClick={() => setSelectedCategoryId(category._id)}
                      className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 animate-slideInLeft ${
                        selectedCategoryId === category._id
                          ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                          : "bg-white text-gray-700 hover:bg-orange-50 shadow-md hover:shadow-lg"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                {/* Menu Items */}
                {selectedCategoryId && (
                  <div className="space-y-8">
                    {categories
                      .filter((cat) => cat._id === selectedCategoryId)
                      .map((category) =>
                        category.subcategories.length === 0 ? (
                          <div key={category._id} className="text-center py-16 animate-fadeInUp">
                            <div className="text-6xl mb-4">🍽️</div>
                            <h3 className="text-2xl font-bold text-gray-600 mb-2">Coming Soon!</h3>
                            <p className="text-gray-500">No items available in "{category.name}" category yet.</p>
                          </div>
                        ) : (
                          category.subcategories.map((sub, subIndex) => (
                            <div
                              key={sub._id}
                              className="animate-fadeInUp"
                              style={{ animationDelay: `${subIndex * 0.2}s` }}
                            >
                              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                                  {sub.name}
                                </span>
                                <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent ml-4"></div>
                              </h3>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sub.foodItems.length === 0 ? (
                                  <div className="col-span-full text-center py-8">
                                    <p className="text-gray-500">No items in this subcategory yet.</p>
                                  </div>
                                ) : (
                                  sub.foodItems.map((item, itemIndex) => (
                                    <div
                                      key={item._id}
                                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift group animate-fadeInUp"
                                      style={{ animationDelay: `${itemIndex * 0.1}s` }}
                                    >
                                      <div className="relative">
                                        <img
                                          src={item.imageUrl || "/placeholder.svg?height=200&width=300"}
                                          alt={item.name}
                                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <button
                                          onClick={() => toggleFavorite(item._id)}
                                          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
                                            favorites.has(item._id)
                                              ? "bg-red-500 text-white"
                                              : "bg-white/80 text-gray-600 hover:bg-white"
                                          }`}
                                        >
                                          <FaHeart />
                                        </button>
                                        {cart[item._id] && (
                                          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            {cart[item._id]} in cart
                                          </div>
                                        )}
                                      </div>

                                      <div className="p-6">
                                        <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                                          {item.name}
                                        </h4>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                          {item.description || "Delicious food item"}
                                        </p>

                                        <div className="flex items-center justify-between">
                                          <div className="text-2xl font-bold text-green-600">৳{item.price}</div>

                                          <div className="flex items-center space-x-2">
                                            {cart[item._id] ? (
                                              <div className="flex items-center space-x-3 bg-orange-100 rounded-full px-4 py-2">
                                                <button
                                                  onClick={() => removeFromCart(item._id)}
                                                  className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors duration-300"
                                                >
                                                  <FaMinus size={12} />
                                                </button>
                                                <span className="font-semibold text-orange-700 min-w-[20px] text-center">
                                                  {cart[item._id]}
                                                </span>
                                                <button
                                                  onClick={() => addToCart(item)}
                                                  className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors duration-300"
                                                >
                                                  <FaPlus size={12} />
                                                </button>
                                              </div>
                                            ) : (
                                              <button
                                                onClick={() => addToCart(item)}
                                                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-full font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                              >
                                                Add to Cart
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          ))
                        ),
                      )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Cart Sidebar */}
          {getTotalItems() > 0 && (
            <div className="lg:w-80">
              <div className="bg-white rounded-2xl shadow-2xl p-6 sticky top-24 animate-slideInRight">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <FaShoppingCart className="mr-2 text-orange-500" />
                    Your Order
                  </h3>
                  <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {getTotalItems()} items
                  </div>
                </div>

                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {Object.entries(cart).map(([itemId, quantity]) => {
                    const item = categories
                      .flatMap((cat) => cat.subcategories)
                      .flatMap((sub) => sub.foodItems)
                      .find((item) => item._id === itemId)

                    if (!item) return null

                    return (
                      <div key={itemId} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                          <p className="text-green-600 font-bold">
                            ৳{item.price} × {quantity}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => removeFromCart(itemId)}
                            className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                          >
                            <FaMinus size={10} />
                          </button>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
                          >
                            <FaPlus size={10} />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-800">Total:</span>
                    <span className="text-2xl font-bold text-green-600">৳{getTotalPrice()}</span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Menu
