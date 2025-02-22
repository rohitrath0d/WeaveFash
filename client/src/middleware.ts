


// we have to create middleware, coz of the reason -> even after successfull login, the user can access login page again by typing '/login' in the search bar.

// Basically, we need to keep track of 3 things:-
// -->1. Public routes -> anyone can access
// -->2. User-related routes
// -->3. Client-side routes
// -->4. Super-admin routes

const publicRoutes = {
    
}
