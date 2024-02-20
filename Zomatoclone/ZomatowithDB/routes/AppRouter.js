const express= require ('express');
const LocationsController = require ("../controllers/LocationsController");
const UsersController=require("../controllers/UsersController");
const RestaurantsController=require('../controllers/RestaurantsController');
const PaymentsController=require('../controllers/PaymentsController');
const AppRouter= express.Router();


AppRouter.get("/get-locations-list",LocationsController.getLocationList);

AppRouter.post("/create-user-account",UsersController.createUserAccount);

AppRouter.post("/user-login",UsersController.userLogin);

AppRouter.post("/filter",RestaurantsController.filter);

// AppRouter.get("/get-restaurants-list",RestaurantsController.getRestaurantsList);
AppRouter.get("/get-restaurant-list-by-location-id/:loc_id",RestaurantsController.getRestaurantsList);

AppRouter.get("/get-restaurant-details-by-id/:id",RestaurantsController.getRestaurantById);

AppRouter.get("/get-meal-type-list",RestaurantsController.getMealTypeList);

AppRouter.get("/get-menu-type-list-by-restaurantId/:r_id",RestaurantsController.getMenuItemsList);

AppRouter.post('/create-order-id',PaymentsController.createOrderId);
AppRouter.post("/verify-payment", PaymentsController.verifyPayment);


module.exports = AppRouter;
