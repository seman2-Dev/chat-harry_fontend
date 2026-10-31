# Cat_Harry
- StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform

📽️📽️Requirement Explanation
# Project Theme
StudioSpace is a high-performance peer-to-peer marketplace designed for creators, filmmakers, photographers, podcasters, and musicians. Studio owners and hosts can list their creative spaces—ranging from photography cyc walls and cinema sound stages to podcast lounges, music recording suites, and art workshops. Fellow creators can discover, filter, inspect dynamic availability, and reserve studio slots with transparent pricing and real-time booking management.

---

### Key Rules:
1. GitHub Commits:
Include a minimum of 15 notable GitHub commits on the client side.
Include a minimum of 8 notable GitHub commits on the server side
2. Readme.md: Add a meaningful readme.md file with the name of your website and a live site URL on the client side. Include a minimum of five bullet points to feature your website, tech stack, local setup steps, and examiner test credentials.
3. Lorem Text: Don't use any Lorem ipsum text; you can not use the default alert to show any error or success message. All notifications must use modern toast components (Sonner/React Hot Toast) and custom modal dialogs.
4. Host your Application: You can choose deployment systems like Vercel or Render for hosting. As you develop a single-page application:
Ensure that the page doesn't throw any errors on reloading from any route.
5. A logged-in user must not be redirected to Login on reloading any private route.

---

## Layout Structure
1. Header / Navbar: Clean StudioSpace logo with an aperture or studio spotlight icon on the left. 
- 1.1 Navigation links: 
- Home (/)
- Explore Studios (/studios)
- How It Works
- About Us
- Unauthenticated State: displays Login and Register action buttons.
- Authenticated State: displays user profile photo/avatar; on hover/click, displays user name and dropdown menu containing Dashboard, Add New Studio, My Studio Listings, My Bookings, and Logout button; sticky header with active route indicators.
2. Footer: Consistent branding featuring StudioSpace logo, mission statement, copyright & terms notice, quick navigation links, popular studio categories, newsletter input, and social links using the new X logo (do NOT use the old Twitter bird).

---

## Home
1. Banner / Hero Slider: Interactive slider with at least 3 slides using Swiper.js, Slick-slider, or slideshow-image. High-res visuals, punchy headline, subtext, and primary CTA buttons ("Explore Studios" / "Host Your Space") linking to /studios.
2. Featured Studios Section (Dynamic): Fetch dynamically from MongoDB, displaying 6 top-rated or newest studio spaces using .limit(6). Each card displays studio image, category badge, title, hourly rate ($XX / hr), rating badge, location, and a "View Details" button.
3. Browse by Studio Categories: Interactive category cards (Photo Studios, Sound Stages, Podcast Rooms, Music Suites, Art Workshops). Clicking any category redirects to /studios with that specific category pre-selected.
4. Extra Home Sections (2 Static/Dynamic Sections):
- Section 1 (How Booking Works): 4-step workflow (1. Discover Spaces → 2. Select Shoot Hours → 3. Book Instantly → 4. Create & Produce).
- Section 2 (Host Guarantee & Creator Support): Platform assurances covering liability protection, verified profiles, equipment safety, and 24/7 host support.

---

## Authentication
1. a. User Login
The user will see a Login page with a form so that the user can log in to this application.
#### Show a Title for Login. & a form with the following fields:
- (Email, Password, Forgot Password, Login button)
If the user logs in successfully, then navigate them to their desired Route / Home page.
If not, show him an error with a toast/error message anywhere in the form.
#### There will be some other options like:
- Show the user a Link for Register so that he can go to the register page.
- Show users a Social Login Button (Google only); on clicking it, the user authenticates with Google and navigates them to their desired Route / Home page.
2. b. User Registration
Create a registration page with a form, so that the user can register themselves in this application.
#### Show a Title for registration and a Form with the following fields:
- (Name, Email, Photo URL, Password, & Register Button)
If the user registers successfully, then navigate them to their Login page.
If not, show him an error with a toast/error message anywhere in the form.
#### Implement password validation:
For password validation, you need to follow the criteria below. Show a password error in the form, and don't register with an invalid password:
- Must have an Uppercase letter in the password
- Must have a Lowercase letter in the password
- Length must be at least 6 characters
#### There will be some other options like:
- Show the user a Link for Login so that he can go to the login page.
- Show users a Social Login Button (Google/Github/Others) on clicking it: The user authenticates with Google Navigate the user to the Home page.
*** Don't implement email verification or the forgot password method, as it will inconvenience the examiner. If you want, you can add these after receiving the assignment result. ***

---

## CRUD Operation:
Define the CRUD operations with the required Routes below. Integrate an image uploading system using imgbb/postimage and store all data in the MongoDB Database.
1. Add New Studio (Private Route — /add-studio):
Form with Title, Category (Select: Photo Studio, Film Stage, Podcast Lounge, Music Suite, Workshop, etc.), Hourly Rate ($), Security Deposit ($), Max Capacity, Location/Address, Image URL, Amenities List (Tags/Checkboxes), Detailed Overview, and Read-only User Email & Name.
2. Upon submission, save data in the MongoDB studios collection, show a success toast, and redirect to /my-listings.
3. Explore Studios Page (/studios):
Grid view listing all available workspaces with title, category badge, hourly rate, location, rating, and View Details button.
4. Studio Details Page (/studios/[id]):
Displays full workspace specifications, gallery carousel, amenity list, host details, reviews, and a "Book Workspace Now" button launching the booking modal.
5. My Studio Listings Page (Private Route — /my-listings):
- Table/Card format showing user-owned spaces (ownerEmail match) with Update and Delete buttons.
- Delete Action: Show confirmation modal before deleting the document from MongoDB with a success toast.
6. Update Studio Page (Private Route — /studios/edit/[id]):
Pre-filled form with existing listing data; read-only host info. On submit, update MongoDB via PUT/PATCH and show a success toast before redirecting to /my-listings.
7. Booking System & My Bookings Page (Private Route — /my-bookings):
- Saves reservation in bookings collection with status "Pending".
- My Bookings page displays reservations with a status badge (Pending, Confirmed, Completed, Cancelled) and a "Cancel Booking" option for pending slots.

---

## Other Requirements
1. Loading State: Add a requirement for branded skeleton loaders or animated spinners during route transitions and asynchronous data fetches.
2. Not-Found Page: Add a requirement for a custom 404 page featuring creative studio illustration and a direct "Return to Home" button.
3. Toast Notifications: Standardized feedback (Sonner / React Hot Toast) across all CRUD, auth, and booking actions.
4. Empty States: Friendly empty state displays with CTA buttons when search queries return no results or booking lists are empty.

---

## UI Design Requirements:
- Unique Design: First, decide what kind of website you want to make. Then, search online or check out websites like ThemeForest to get ideas for the design. But remember, your website idea shouldn't be similar to any projects you've done before or to any examples in our modules or conceptual sessions.
1.Keep the main heading style (font, size, color) consistent across all sections.
2. Keep paragraph spacing balanced and text easily readable.
3. Maintain uniform image sizes and spacing.
4. Use the same button style as on the home page.
5. Ensure good spacing and proper alignment.
6. Navbar: Keep the heading/logo the same style and size as on the home page.
7. Use a grid layout with equal image sizes.
8. Keep all cards equal height and width (especially in services, projects, or products section).
9. Use the new X logo instead of the old Twitter bird to match the latest rebrand.
10. Responsiveness: Make it responsive for all devices, including mobile, tablet, and desktop views.

---

## Resources:
- https://uiverse.io 
- https://devmeetsdevs.com 
- https://bootcamp.uxdesign.cc/free-images-and-resources-collection-for-website-c77f2fc46ce5 
- https://themeforest.net 
- https://codecanyon.net 

---

## Challenges
- Implement 3-4 challenge requirements to test higher-order thinking with MongoDB operators and security:

1. Challenge 1 (JWT Security with HTTPOnly Cookies): Protect server-side mutations (POST /api/studios, DELETE /api/studios/[id], POST /api/bookings) by storing JWT in HTTPOnly cookies and rejecting unauthorized requests with 401 Unauthorized.
2. Challenge 2 (Booking Double-Booking Prevention): Verify time overlap against existing "Confirmed" bookings in MongoDB before saving new reservations, rejecting collisions with a clear error message.
3. Challenge 3 (Theme Customization): Add a theme toggling button for changing themes from light to dark / dark to light. Changing the theme should make the full system dark/light based on user interaction.

---

## Optional Requirements
1. Add optional requirements so energetic students can differentiate their project:

- PDF Booking Invoice Generator: Downloadable PDF receipt for confirmed studio bookings.
- Saved Studios Wishlist: Heart icon on studio cards allowing logged-in users to save favorite spaces in MongoDB.

---

## Tech Stack:

Layer
Technology Selection
1. FrontEnd
- Next JS (App Router), Hero UI / Daisy UI / Shadcn UI, TypeScript / JavaScript
2. Authentication & Authorization
- BetterAuth, MongoDB Adapter, JWT
3. BackEnd
- Express JS, MongoDB, TypeScript / JavaScript



