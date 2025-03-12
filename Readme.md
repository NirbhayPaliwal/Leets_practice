#  Leet  

A website for making LeetCode practice more competitive and personalized with time-bound contest practice.  

## ⭐ Features  

- 🎯 **Create Personalized Contests** *(In Progress)*: Build custom contests by selecting problems based on difficulty.  
  ![problem_select_image](Related%20stuff/problem_select.png)  
  ![contest_image](Related%20stuff/contest.png)

- 🏆 **Add Friends**: Add your friend's username to your friend list and track their activities. See your ranking among them.  
  ![home](Related%20stuff/Home.png)  

## 🛠 Tech Stack  

- 🎨 **Frontend**: React.js and Tailwind CSS  
- ⚙️ **Backend**: Node.js with Express.js  
- 💾 **Database**: MongoDB  
- 🔐 **Authentication**: JWT-based authentication  

## 🏗 Run Locally  

1. **Clone the repository**:  

   ```bash
   git clone https://github.com/NirbhayPaliwal/Leet
   cd Leet
   ```

2. **Set up environment variables**:  

   Create `.env` files for both the backend and frontend.  

   ### 📌 Backend `.env` File (Located in the backend folder)  

   ```env
   DB_LINK=<your_mongodb_connection_string>
   NODE_ENV=Development
   JWT_SECRET=<your_secret_key>
   ```

   ### 📌 Frontend `.env` File (Located in the frontend folder)  

   ```env
   VITE_BACKEND_URI=http://localhost:5000
   ```

   ⚠️ **Important:**  
   - Do **NOT** commit `.env` files to version control. Add them to `.gitignore`.  
   - Replace placeholder values (`<your_mongodb_connection_string>` and `<your_secret_key>`) with actual credentials.  

3. **Install dependencies**:  

   ```bash
   npm run install-all
   ```

4. **Start the server**:  

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:5173`.  

---

## 🎯 Happy Practicing!  

Keep coding, challenge your friends, and improve your problem-solving skills. 🚀  
