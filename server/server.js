import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from "./model/Recipe.js";
import Comment from "./model/Comment.js";
import Favorite from "./model/Favorite.js";
import UserRecipe from "./model/UserRecipe.js";
import User from "./model/User.js";

dotenv.config();
import path from "path";
import url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
const PORT = 5000;

app.use(express.static(path.join(__dirname, "../client")));

async function connectToMongoose() {
  await mongoose.connect(process.env.URL);
  console.log("The server is connected.");
}
connectToMongoose();

app.get("/api/recipes", async (req, res) => {
  const input1 = req.query.input1 && (req.query.input1)[0].toUpperCase() + (req.query.input1).slice(1).toLowerCase();
  const input2 = req.query.input2 && (req.query.input2)[0].toUpperCase() + (req.query.input2).slice(1).toLowerCase();
  const input3 = req.query.input3 && (req.query.input3)[0].toUpperCase() + (req.query.input3).slice(1).toLowerCase();
  const input4 = req.query.input4 && (req.query.input4)[0].toUpperCase() + (req.query.input4).slice(1).toLowerCase();
  const input5 = req.query.input5 && (req.query.input5)[0].toUpperCase() + (req.query.input5).slice(1).toLowerCase();
  const userIngredients = [input1, input2, input3, input4, input5];
  const recipes = await Recipe.find();
  if (Object.keys(req.query).length > 0) {
    const resultRecipes = recipes.filter(recipe => {
      const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.name);
      if (userIngredients.every(ingredient => {
        return recipeIngredients.some(recipeIngredient => recipeIngredient.includes(ingredient))
      })) {
        return true;
      }
    })
    return res.json(resultRecipes);
  }
  if (Object.keys(req.query).length === 0) {
    return res.json(recipes)
  }
});

app.get("/api/comments", async (req, res) => {
  const comments = await Comment.find().populate("user");
  res.json(comments);
});

app.get("/api/favorites", async (req, res) => {
  const favorties = await Favorite.find({});
  res.json(favorties);
});

app.get("/api/user/recipes", async (req, res) => {
  const recipes = await UserRecipe.find();
  res.json(recipes);
});

app.get("/api/users/", async (req, res, next) => {
  const queryEmail = req.query.email;
  try {
    const users = queryEmail ? (await User.findOne({ email: queryEmail }).populate("favorites")) : (await User.find().populate("favorites"));
    return res.json(users);
  } catch (error) {
    return next(error);
  }
})

app.get("/api/loggedInUser/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const loggedInUser = await User.findById(id).populate("favorites");
    return res.json(loggedInUser);
  } catch (error) {
    return next(error);
  }
})

app.get("/api/dishes/:type", async (req, res) => {
  const dishType = req.params.type;
  const page = parseInt(req.query.page);
  const recipesPerPage = 2;
  if (dishType === "favorites") {
    const favoriteRecipesCount = await Favorite.find().count();
    const favoriteRecipes = await Favorite.find().skip(page * recipesPerPage - recipesPerPage).limit(recipesPerPage)
    const favoritePageCount = Math.ceil(favoriteRecipesCount / recipesPerPage)
    return res.json({
      pagination: {
        recipesCount: favoriteRecipesCount,
        pageCount: favoritePageCount,
      },
      dishes: favoriteRecipes,
    });
  }
  const recipesCount = await Recipe.find({ type: dishType }).count();
  const pageCount = Math.ceil(recipesCount / recipesPerPage);

  try {
    const dishes = await Recipe.find({ type: dishType })
      .skip(page * recipesPerPage - recipesPerPage)
      .limit(recipesPerPage);
    return res.json({
      pagination: {
        recipesCount,
        pageCount,
      },
      dishes,
    });
  } catch (error) {
    return next(error);
  }
});

app.post("/api/comments", async (req, res) => {
  try {
    const comment = req.body.newComment;
    const recipeId = req.body.recipeIds;
    const userId = req.body.userId;
    const createdAt = Date.now();
    const newComment = new Comment({
      comment,
      createdAt,
      recipe: recipeId.recipeIds,
      user: userId
    });
    const savedComment = await newComment.save();
    res.json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.post("/api/users", async (req, res, next) => {
  const newUser = req.body;
  try {
    const addUser = await User.create(newUser);
    return res.json(addUser);
  } catch (error) {
    return next(error);
  }
})

app.patch("/api/users/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateUser = await User.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { ...req.body } },
      { new: true }
    )
    return res.json(updateUser);
  } catch (error) {
    return next(error);
  }
})

app.delete("/api/comments/:id", async (req, res) => {
  const commentId = req.params.id;
  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    res.json({ status: "deleted" });
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/user/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;
  const recipe = await UserRecipe.find({ _id: recipeId });
  res.send(recipe);
});

// app.patch('/user/recipes/:id', async (req, res) => {
//   const recipeId = req.params.id;
//   const editedRecipe = await UserRecipe.findById(recipeId)
//   editedRecipe.mealName = req.body.mealName || editedRecipe.mealName;
//   editedRecipe.img = req.body.img || editedRecipe.img;
//   editedRecipe.ingredients = req.body.ingredients || editedRecipe.ingredients;
//   editedRecipe.description = req.body.description || editedRecipe.description;
//   editedRecipe.time = req.body.time || editedRecipe.time;
//   await editedRecipe.save();
//   res.send(editedRecipe);
// })

// app.patch("/user/recipes/:id", async (req, res) => {
//   const recipeId = req.params.id;
//   if (recipeId !== -1) {
//     // const updatedRecipe = {
//     //   mealName: recipe.mealName,
//     //   img: recipe.img,
//     //   ingredients: recipe.ingredients,
//     //   description: recipe.description,
//     //   time: recipe.time,
//     // };
//     const newUpdatedRecipe = await UserRecipe.updateOne(
//       { _id: recipeId },
//       { $set: req.body }, { new: true }
//     );
//     res.send(newUpdatedRecipe);
//   }
// });
app.patch("/api/user/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;
  const updatedRecipe = await UserRecipe.findByIdAndUpdate(recipeId, req.body, {
    new: true,
  });
  res.send(updatedRecipe);
});

app.post("/api/user/recipes", async (req, res) => {
  const mealName = req.body.mealName;
  const img = req.body.img;
  const ingredients = req.body.ingredients;
  const description = req.body.description;
  const time = req.body.time;
  const userRecipe = new UserRecipe({
    mealName,
    img,
    ingredients,
    description,
    time,
  });
  const newRecipe = await userRecipe.save();
  res.json(newRecipe);
});

app.delete("/api/user/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;
  if (recipeId !== -1) {
    await UserRecipe.deleteOne({ _id: recipeId });
    return res.json({ id: recipeId });
  }
});

app.post("/api/favorites", async (req, res) => {
  const { userId } = req.query;
  const mealName = req.body.mealName;
  const ingredients = req.body.ingredients;
  const description = req.body.description;
  const time = req.body.time;
  const type = req.body.type;

  try {
    const favorite = new Favorite({
      mealName,
      ingredients,
      description,
      time,
      type,
      userId
    });

    /* favorite
      .save()
      .then((favorite) => res.json(favorite))
      .catch((err) => {
        res.status(400).json({ success: false });
      }); */

    const savedToFavorites = await favorite.save();
    res.json(savedToFavorites);
  } catch (error) {
    throw new Error(error);
  }
});

app.post("/api/recipes", async (req, res, next) => {
  try {
    const [rating, ingredientId, userVotes] = req.body;
    const updatedIngredient = await Recipe.findOneAndUpdate(
      { _id: ingredientId },
      [
        {
          $set: {
            ratings: {
              $ifNull: ["$rating", [rating]],
            },
            userVotes: {
              $ifNull: ["$userVotes", userVotes],
            },
          },
        },
      ],
      { new: true, upsert: true }
    );
    res.json(updatedIngredient);
  } catch (error) {
    next(error);
    /*      console.log(error.message);
    res.status(500).json({ error: "something went wrong" }); */
  }
});

app.patch("/api/recipes/:id", async (req, res) => {
  const dishId = req.params.id;

  if (mongoose.isValidObjectId(dishId)) {
    try {
      const newRating = req.body.rating;
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        dishId,
        {
          $push: { ratings: newRating },
          $inc: { userVotes: 1 },
        },
        { new: true }
      );

      if (!updatedRecipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }

      res.json({ updatedRecipe });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Could not update the document" });
    }
  } else {
    res.status(400).json({ error: "Not a valid recipe Id" });
  }
});

app.delete("/api/favorites/:name", async (req, res) => {
  const favoriteName = req.params.name;
  try {
    const deletedFavorite = await Favorite.deleteOne({
      mealName: favoriteName,
    });
    res.json(deletedFavorite);
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(PORT, () => {
  console.log(`This server is running on PORT ${PORT}`);
});
