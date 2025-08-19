Name: Yuvaraj  
**Roll No:** IEC2024051
--
## Deployment
https://codedine.vercel.app

**Reference**

<img width="480" height="" alt="ref 1" src="https://github.com/user-attachments/assets/450d5c3f-f717-40c2-840c-835574fe09b7" />
<img width="480" height="" alt="ref 2" src="https://github.com/user-attachments/assets/b257ea94-81ec-45ef-a4e6-7c58e003d095" />

---

##  Features

###  Seeded Data
- Database seeded using [test-data-gules.vercel.app/data.json](https://test-data-gules.vercel.app/data.json)

---

### 🛠 Backend Features
- **MongoDB Atlas Integration:** Server initializes only after successful DB connection.  
- **Schemas:**
  - **User** → `name`, `email`, `password` *(with fields prepared for `progress`, `bookmarks` – frontend integration pending)*  
  - **Question** → `title`, `url`  
  - **Category** → `title`, `questions` (array of Question references)  
- **Authentication:**
  - Register & Login with **JWT-based authentication**  
  - Passwords **securely hashed** using bcrypt  
- **Protected Routes:** JWT middleware for user-only operations  
- **API Endpoints:**
  - **Content (`/content`)**
    - Fetch categories & related questions  
    - Search questions by title – `?search=array`  
    - Pagination – `?page=2&limit=5`  
  - **Auth (`/auth`)**
    - Login – `/login`  
    - Register – `/register`  
    - Logout – `/logout`  

---

### 🎨 Frontend Features
- **Data Fetching:** All content dynamically fetched from backend API  
- **Responsive Design:** Works across desktop, tablet and mobile devices  
- **User Authentication:**  
  - Login & Register pages with global state  
  - Protected routes prepared for authenticated users  
- **UI/UX Enhancements:**  
  - Accordion-style categories & questions display  
  - Dark/Light mode toggle (saved in `localStorage`)  

---

## 🚧 Under Development
- **User Dashboard** – Progress bar & bookmarks UI  
- **Progress Tracking & Bookmarks** – API is ready but frontend not yet integrated   

---

### Backend Setup
