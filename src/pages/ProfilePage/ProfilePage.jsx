import { useSelector } from "react-redux";
import { selectUser, selectAuthLoading } from "@/store/AuthSlice";
import { selectFavoriteRecipes } from "@/store/FavoriteRecipesSlice";
import { Button } from "@/components/ui";
import { Link } from "react-router";

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectAuthLoading);
  const favoriteRecipes = useSelector(selectFavoriteRecipes);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="border-orange-500 border-t-4 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto p-6 max-w-4xl">
        <div className="text-center">
          <h1 className="mb-4 font-bold text-gray-900 text-3xl">Profile</h1>
          <p className="text-gray-600">Unable to load user information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 rounded-t-lg">
          <div className="flex items-center space-x-6">
            <div className="flex justify-center items-center bg-white shadow-lg rounded-full w-24 h-24">
              {user.image ? (
                <img
                  src={user.image}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="rounded-full w-20 h-20 object-cover"
                />
              ) : (
                <div className="flex justify-center items-center bg-orange-100 rounded-full w-20 h-20">
                  <span className="font-bold text-orange-600 text-2xl">
                    {user.firstName?.[0]?.toUpperCase() ||
                      user.username?.[0]?.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="text-white">
              <h1 className="mb-2 font-bold text-3xl">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-orange-100 text-lg">@{user.username}</p>
              {user.email && <p className="text-orange-100">{user.email}</p>}
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="p-6">
          <div className="mb-8">
            <h2 className="mb-4 font-bold text-gray-900 text-xl">
              Profile Information
            </h2>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              <div>
                <label className="block mb-1 font-medium text-gray-700 text-sm">
                  First Name
                </label>
                <p className="text-gray-900">
                  {user.firstName || "Not provided"}
                </p>
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 text-sm">
                  Last Name
                </label>
                <p className="text-gray-900">
                  {user.lastName || "Not provided"}
                </p>
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 text-sm">
                  Username
                </label>
                <p className="text-gray-900">{user.username}</p>
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 text-sm">
                  Email
                </label>
                <p className="text-gray-900">{user.email || "Not provided"}</p>
              </div>
              {user.phone && (
                <div>
                  <label className="block mb-1 font-medium text-gray-700 text-sm">
                    Phone
                  </label>
                  <p className="text-gray-900">{user.phone}</p>
                </div>
              )}
              {user.age && (
                <div>
                  <label className="block mb-1 font-medium text-gray-700 text-sm">
                    Age
                  </label>
                  <p className="text-gray-900">{user.age}</p>
                </div>
              )}
              {user.birthDate && (
                <div>
                  <label className="block mb-1 font-medium text-gray-700 text-sm">
                    Birth Date
                  </label>
                  <p className="text-gray-900">
                    {new Date(user.birthDate).toLocaleDateString()}
                  </p>
                </div>
              )}
              {user.gender && (
                <div>
                  <label className="block mb-1 font-medium text-gray-700 text-sm">
                    Gender
                  </label>
                  <p className="text-gray-900 capitalize">{user.gender}</p>
                </div>
              )}
            </div>
          </div>

          {/* Address Information */}
          {user.address && (
            <div className="mb-8">
              <h2 className="mb-4 font-bold text-gray-900 text-xl">Address</h2>
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                {user.address.address && (
                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">
                      Street Address
                    </label>
                    <p className="text-gray-900">{user.address.address}</p>
                  </div>
                )}
                {user.address.city && (
                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">
                      City
                    </label>
                    <p className="text-gray-900">{user.address.city}</p>
                  </div>
                )}
                {user.address.state && (
                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">
                      State
                    </label>
                    <p className="text-gray-900">{user.address.state}</p>
                  </div>
                )}
                {user.address.postalCode && (
                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">
                      Postal Code
                    </label>
                    <p className="text-gray-900">{user.address.postalCode}</p>
                  </div>
                )}
                {user.address.country && (
                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">
                      Country
                    </label>
                    <p className="text-gray-900">{user.address.country}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-gray-50 px-6 py-8">
            <h2 className="mb-4 font-bold text-gray-900 text-xl">
              Favorite Recipes
            </h2>
            <div className="bg-white p-8 border border-gray-200 rounded-lg">
              {favoriteRecipes.length > 0 ? (
                <div>
                  <p className="text-gray-600 mb-4 text-center">
                    You have {favoriteRecipes.length} favorite{" "}
                    {favoriteRecipes.length === 1 ? "recipe" : "recipes"}!
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favoriteRecipes.map((recipe) => (
                      <li
                        key={recipe.id}
                        className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-orange-50 transition-colors"
                      >
                        <img
                          src={recipe.image}
                          alt={recipe.name}
                          className="w-12 h-12 rounded-md object-cover mr-3"
                        />
                        <div className="flex-1">
                          <Link
                            to={`/recipes/${recipe.id}`}
                            className="text-gray-900 hover:text-orange-500 transition-colors font-medium"
                          >
                            {recipe.name}
                          </Link>
                          {recipe.tags?.length > 0 && (
                            <div className="flex flex-wrap mt-1">
                              {recipe.tags.slice(0, 2).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-orange-100 text-orange-800 rounded-md px-2 py-1 mr-1 mb-1"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 text-center">
                    <Link to="/favorites">
                      <Button variant="primary" label="View All Favorites">
                        View All Favorites
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600">
                    You have no favorite recipes yet.
                  </p>
                  <p className="text-gray-500 text-sm mt-2 mb-4">
                    Start exploring recipes and save your favorites!
                  </p>
                  <Link to="/recipes">
                    <Button variant="primary" label="Browse Recipes">
                      Browse Recipes
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProfilePage };
