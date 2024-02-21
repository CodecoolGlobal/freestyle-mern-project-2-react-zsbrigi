import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from './model/Recipe.js';
import Comment from "./model/Comment.js";
import Favorite from "./model/Favorite.js";
import UserRecipe from "./model/UserRecipe.js";
import User from "./model/User.js";

dotenv.config();
import path from "path";
import url from "url";
const __filename = url.fileURLToPath(import.meta.url);
console.log(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);


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
  const recipes = await Recipe.find();
  res.json(recipes);
});

app.get("/api/comments", async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
})

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
    const users = queryEmail ? await User.findOne({ email: queryEmail }) : await User.find();
    return res.json(users);
  } catch (error) {
    return next(error);
  }
})

app.get("/api/:type", async (req, res) => {
  const dishType = req.params.type;
  const dishes = await Recipe.find({ type: dishType });
  res.json(dishes);
});


app.post("/api/comments", async (req, res) => {
  try {
    const comment = req.body.newComment;
    const recipeId = req.body.recipeIds
    const createdAt = Date.now();
    const newComment = new Comment({
      comment,
      createdAt,
      recipe: recipeId.recipeIds

    })
    const savedComment = await newComment.save()
    res.json(savedComment)
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false })
  }
})

app.post("/api/users", async (req, res, next) => {
  const newUser = req.body;
  try {
    const addUser = await User.create(newUser);
    return res.json(addUser);
  } catch (error) {
    return next(error);
  }
})

app.delete("/api/comments/:id", async (req, res) => {
  const commentId = req.params.id
  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId)
    res.json({ status: "deleted" })
  } catch (error) {
    console.error(error)
  }
})



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
app.patch('/api/user/recipes/:id', async (req, res) => {
  const recipeId = req.params.id;
  const updatedRecipe = await UserRecipe.findByIdAndUpdate(recipeId, req.body, { new: true })
  res.send(updatedRecipe);
})

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
  console.log("request: ", req.body);

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



app.post("/api/recipes", async (req, res) => {
  console.log("Ez az update a ratingre:", req.body);
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
    console.log(error.message);
    res.status(500).json({ error: "something went wrong" });
  }
});

app.patch("/api/recipes/:id", async (req, res) => {
  const dishId = req.params.id;

  if (mongoose.isValidObjectId(dishId)) {
    try {
      const newRating = req.body.rating;
      console.log("The rating in serveeeer:", newRating);
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

app.delete('/api/favorites/:name', async (req, res) => {
  const favoriteName = req.params.name;
  try {
    const deletedFavorite = await Favorite.deleteOne({ mealName: favoriteName });
    res.json(deletedFavorite);
  } catch (error) {
    throw new Error(error);
  }

})


app.listen(PORT, () => {
  console.log(`This server is running on PORT ${PORT}`);
});




