#  Campus X – The Winning Project of InnoDev 🏆

> 🚀 A revolutionary OLX platform for college students, ranked **1st at InnoDev Hackathon**!

🎥 [Watch the Demo on LinkedIn](https://www.linkedin.com/posts/ayush-tiwari-84a823281_campus-x-the-winning-project-of-innodev-activity-7263876541317603328-2cGr/)

---
## ❓Why Campus X?

Traditional marketplaces like OLX, Facebook Marketplace, or WhatsApp groups fail to cater to **college-specific** requirements like:

- College-only listings
- Lost & Found
- Bidding for second-hand goods
- Safety & trust within campus
- Affordable student-friendly transactions

Hence, **Campus X** was born — A full-fledged, secure, and real-time marketplace dedicated to college students.

---

## ⚡ Problem Statement

> Students often struggle to buy/sell essential items, find lost belongings, or interact securely within the campus ecosystem.

- Students depend on unorganized WhatsApp groups or personal contacts for selling/buying.
- No dedicated auction or bidding system for second-hand items.
- Lost & Found management is chaotic and ineffective.
- Zero analytical insights for students or admins.
- No centralized platform to promote affordability, trust, and real-time transactions.

---

## 💡 Our Solution — Campus X
![ChatGPT Image Apr 4, 2025, 12_06_38 PM](https://github.com/user-attachments/assets/92fdd803-3769-4590-92a8-a36272929e2f)

---


##  Architecture Diagram


```mermaid
graph TD
  A[User] -->|Frontend| B(Next.js / React)
  B -->|API| C(Express.js)
  C --> D[(MongoDB)]
  C --> E[Flask AI Server]
  C --> F[Cloudinary]
  C --> G[Razorpay]
  C --> H[Socket.io]
  C --> I[Cron Jobs]

````
**Fallback Architecture:**

- 👩‍💻 User interacts with UI (React/Next.js)
- 🧠 API handled by Express.js server
- 🧾 Data stored in MongoDB
- 🤖 AI handled via Flask server
- ☁️ Image uploads to Cloudinary
- 💸 Payments via Razorpay
- 💬 Real-time chat via Socket.io
- ⏰ Background jobs with Node Cron

---

## 🚀 Features

| Feature                | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| 🔐 OTP Auth            | Email verification via **Nodemailer**                                       |
| 📢 Ad Management       | Create, update, delete ads                                                  |
| 💬 Engagement          | Like, comment, and review ads                                               |
| ⚡ Live Auction        | Real-time bidding powered by **Socket.io**                                  |
| 🏪 Storefronts         | Group ads into custom seller stores                                         |
| 🔍 Lost & Found        | Recover or post lost items                                                  |
| 💳 Payments            | Pay via **Razorpay**, with invoice generation                               |
| 📨 Real-time Chat      | Instant messaging with notification sounds                                  |
| 📊 Dashboard           | Graphs and charts using **React Charts**                                    |
| 🌍 Multi-language      | Auto-translate content using **Google Translate API**                       |
| 🤖 AI Recommendations | Suggests items using **KNN via Flask, NumPy, Pandas**                        |
| ⏳ Task Scheduler       | Auto-delete expired ads using **Node Cron**                                 |
| ☁️ Image Uploads       | Compressed & hosted via **Cloudinary**                                      |

---

## 📸 Screenshots


## 💻 Tech Stack

| 🎨 Frontend         | 🔧 Backend                          | 🧠 AI/ML         |
|--------------------|-------------------------------------|------------------|
| React.js           | Node.js                             | Flask            |
| Next.js            | Express.js                          | NumPy            |
| Tailwind CSS       | MongoDB                             | Pandas           |
| React Chart.js     | JWT Authentication                  | KNN Algorithm    |
|                    | Nodemailer                          |                  |
|                    | Cloudinary                          |                  |
|                    | Razorpay                            |                  |
|                    | Socket.io                           |                  |
|                    | Node-Cron                           |                  |


---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/campus-x.git
cd campus-x

# Install dependencies
npm install

# Start development server
npm run dev

# (Optional) Run AI Flask server
cd ai-model
pip install -r requirements.txt
python app.py
```



> 🚀 *Campus X isn’t just a project — it’s a complete marketplace solution for student ecosystems.*  




