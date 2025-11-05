# 🔑 Chatbot API Setup Guide

Your custom chatbot UI is now ready to connect to **real AI**! Here's how to get it working.

---

## ✅ What's Done

- ✅ Removed Chatbase widget embed
- ✅ Custom chatbot moved back to **bottom-right**
- ✅ API integration code added
- ✅ Fallback to keyword matching if API fails

---

## 🎯 Current Status

**Right now:** Your chatbot uses **keyword matching** (fallback mode)

**After setup:** It will use **real AI** from Chatbase or OpenAI

---

## 🔧 Option 1: Chatbase API (Recommended)

### **Step 1: Get API Key**

1. Go to [Chatbase Dashboard](https://www.chatbase.co/dashboard)
2. Log in to your account
3. Click on your chatbot
4. Go to **"Connect"** → **"API"**
5. Copy your **API Key**

**Note:** Chatbase API might require a paid plan. Check their pricing.

### **Step 2: Add API Key**

Open `frontend/src/components/ChatBot.jsx` and find line 35:

```javascript
'Authorization': 'Bearer YOUR_API_KEY_HERE'
```

Replace `YOUR_API_KEY_HERE` with your actual key:

```javascript
'Authorization': 'Bearer cb_1234567890abcdef...'
```

### **Step 3: Test It**

```bash
npm run dev
```

Try asking real questions - the AI should respond intelligently!

---

## 🔧 Option 2: OpenAI API (More Control)

If Chatbase API doesn't work or is too expensive, use OpenAI directly!

### **Pros:**
- ✅ More control over responses
- ✅ Cheaper ($0.50-$2 per 1000 messages)
- ✅ GPT-3.5 or GPT-4
- ✅ Well documented

### **Setup:**

I'll need to create a serverless function (AWS Lambda or Vercel) to call OpenAI securely.

**Would you like me to create this?** It includes:
1. AWS Lambda function
2. Updated ChatBot component
3. Deployment instructions

Let me know and I'll build it!

---

## 🎨 What Your Chat Does Now

### **With API Key (AI Mode):**
```
User: "What are Si's best skills?"
AI: "Si Li excels in Cloud Computing, particularly 
     with AWS where he's certified. He has hands-on 
     experience with cloud migration projects and..."
```

### **Without API Key (Keyword Mode):**
```
User: "What are Si's best skills?"
Bot: "Si Li specializes in Cloud Computing (AWS 
     certified), AI & Productivity tools..."
```

---

## 💰 Cost Comparison

| Option | Setup | Cost | Quality |
|--------|-------|------|---------|
| **Keyword Matching** | Done! | $0 | Good |
| **Chatbase API** | 5 min | $19/mo or pay-per-use | Excellent |
| **OpenAI + Lambda** | 1 hour | ~$0.50-2/mo | Excellent |

---

## 🚀 Quick Test (Current State)

Your chatbot works RIGHT NOW with keyword matching!

```bash
npm run dev
```

**Try asking:**
- "What are Si's skills?"
- "Tell me about his experience"
- "Show me his projects"
- "How can I contact Si?"

All of these work with the current fallback!

---

## 🔐 Security Best Practice

**Never commit API keys to Git!**

### Create `.env.local` file:

```bash
# In frontend/ directory
echo "VITE_CHATBASE_API_KEY=your_key_here" > .env.local
```

### Update ChatBot.jsx to use env variable:

```javascript
'Authorization': `Bearer ${import.meta.env.VITE_CHATBASE_API_KEY}`
```

### Add to .gitignore:

```
.env.local
.env
```

---

## 📊 Decision Guide

### **Use Keyword Matching (Current) if:**
- ✅ Want to deploy immediately
- ✅ Don't want monthly costs
- ✅ Questions are predictable
- ✅ Just want to show off your UI

### **Upgrade to AI if:**
- ✅ Want truly conversational chat
- ✅ Visitors ask unpredictable questions
- ✅ Want to impress with intelligence
- ✅ Budget allows ~$1-20/month

---

## 🎯 My Recommendation

**For now:** Deploy with keyword matching
- It works great for most questions
- $0 cost
- Shows your skills

**Later:** Add OpenAI API when you want to upgrade
- I'll help you set up AWS Lambda
- Only costs ~$1-2/month
- Much better responses

---

## 📝 Next Steps

**Option A: Deploy Now (No Changes)**
```bash
npm run build
git add .
git commit -m "Add AI chatbot with keyword matching"
git push
```

**Option B: Get Chatbase API Key**
1. Get API key from Chatbase
2. Add to ChatBot.jsx line 35
3. Test locally
4. Deploy

**Option C: Set Up OpenAI + Lambda**
- Let me know and I'll create the full setup!
- Takes ~1 hour but you'll have complete control

---

## 💬 Questions?

- Need help getting Chatbase API key?
- Want me to build the OpenAI Lambda version?
- Having issues with the current setup?

Just ask! 🚀

---

**Made with ❤️ for Si Li's Portfolio**

Last Updated: November 2025

