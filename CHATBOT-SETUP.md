# 🤖 AI Chatbot Setup Guide

Your portfolio now has a **beautiful terminal-themed chatbot UI**! Currently, it uses simple keyword matching. Let's upgrade it to real AI!

---

## 🎨 What You Have Now

✅ Custom terminal-themed chat interface  
✅ Floating chat button  
✅ Smooth animations  
✅ Mobile responsive  
✅ Quick question buttons  
✅ Basic keyword responses  

**Location:** `frontend/src/components/ChatBot.jsx`

---

## 🚀 Upgrade Options

### **Option 1: Chatbase.co Integration (Easiest) ⭐**

**Time:** 15 minutes  
**Cost:** FREE (50 messages/month) or $19/month unlimited  
**Setup:** No code changes needed!

#### Steps:

1. **Create Account**
   - Go to [chatbase.co](https://www.chatbase.co/)
   - Sign up (free)

2. **Create Chatbot**
   - Click "New Chatbot"
   - Upload your resume PDF or paste portfolio text
   - It will auto-train on your content

3. **Get Embed Code**
   - Go to "Connect" → "Website"
   - Copy the embed script

4. **Add to Your Portfolio**
   - Open `frontend/index.html`
   - Add this before `</body>`:
   ```html
   <script>
     window.embeddedChatbotConfig = {
       chatbotId: "hA9g_K0FRfZjFvrfFodKC",
       domain: "www.chatbase.co"
     }
   </script>
   <script
     src="https://www.chatbase.co/embed.min.js"
     chatbotId="hA9g_K0FRfZjFvrfFodKC"
     domain="www.chatbase.co"
     defer>
   </script>
   ```

5. **Hide Your Custom UI (Optional)**
   - In `Portfolio.jsx`, comment out: `<ChatBot />`
   - OR keep both! Chatbase will show as a second option

**Pros:**
- ✅ Truly smart AI responses
- ✅ Learns from your content
- ✅ No backend needed
- ✅ Free tier available

---

### **Option 2: OpenAI API + AWS Lambda (Full Control)**

**Time:** 2-3 hours  
**Cost:** ~$0.01-0.05 per conversation  
**Setup:** Requires backend setup

This gives you **complete control** over the AI behavior.

#### Architecture:
```
Your Portfolio (React)
    ↓
AWS Lambda Function
    ↓
OpenAI API (GPT-3.5/GPT-4)
```

#### What I'll Provide:
1. ✅ Lambda function code
2. ✅ Updated ChatBot.jsx to call Lambda
3. ✅ AWS setup instructions
4. ✅ Cost optimization tips

**Would you like me to create this?** Let me know and I'll build it!

---

### **Option 3: Voiceflow Integration**

**Time:** 30 minutes  
**Cost:** FREE tier available  

1. Go to [voiceflow.com](https://www.voiceflow.com/)
2. Create visual conversation flow
3. Export as web widget
4. Embed in your site

**Pros:**
- ✅ Visual conversation builder
- ✅ More control than Chatbase
- ✅ Free tier

---

## 🎯 My Recommendation

### **For You: Start with Chatbase**

**Why?**
1. ✅ **15 minutes setup** vs 2-3 hours
2. ✅ **FREE tier** (50 msgs/month)
3. ✅ **Actually smart** - uses GPT under the hood
4. ✅ **No backend maintenance**
5. ✅ **Auto-learns** from your portfolio content

### **Upgrade Later If Needed**
- If you need more customization → Switch to OpenAI + Lambda
- If you hit free tier limits → Upgrade Chatbase or switch

---

## 📝 Training Your AI (Chatbase)

### **What to Upload:**

1. **Your Resume** (PDF)
2. **Portfolio Content:**
   ```
   About Si Li:
   - Computer Science student at QUT (GPA 6.5/7)
   - IT Support Officer at Brisbane Catholic Education
   - AWS Certified
   - Skills: Cloud Computing, AI, Python, C#, JavaScript
   
   Experience:
   - Led cloud migration projects
   - Developed automation tools
   - Geo-Intelligence ML System
   - Video processing API on AWS
   
   Contact:
   - Email: lis09296313@gmail.com
   - GitHub: github.com/bairigao
   - LinkedIn: [your profile]
   ```

3. **Instructions for AI:**
   ```
   You are Si Li's portfolio assistant. Be friendly, professional, 
   and enthusiastic about his skills. When asked about projects, 
   provide specific details. If asked about availability, mention 
   he's actively seeking opportunities. Always encourage visitors 
   to reach out via email or LinkedIn.
   ```

---

## 🎨 Customization Options

### **Style the Chatbase Widget** (if using Option 1)

In the embed config:
```javascript
window.embeddedChatbotConfig = {
  chatbotId: "YOUR_ID",
  domain: "www.chatbase.co",
  
  // Customize appearance
  chatbotConfig: {
    welcomeMessage: "👋 Hi! Ask me anything about Si Li!",
    primaryColor: "#9333ea", // Purple to match your theme
    botName: "Si's AI Assistant",
    showBranding: false, // Hide "Powered by Chatbase" (paid plan)
  }
}
```

### **Keep Your Custom UI**

Your current chatbot (`ChatBot.jsx`) can stay! Benefits:
- Shows you know how to code
- Custom design matches your portfolio
- Fallback if Chatbase is down

Just update the `getBotResponse()` function to call Chatbase API instead of keyword matching.

---

## 🔧 Technical Details

### **Current Implementation:**

```jsx
// Simple keyword matching
const getBotResponse = async (userMessage) => {
  if (message.includes('skill')) {
    return "Si specializes in Cloud Computing...";
  }
  // ... more keywords
}
```

### **Upgraded with Real AI (Option 2):**

```jsx
const getBotResponse = async (userMessage) => {
  const response = await fetch('YOUR_LAMBDA_URL', {
    method: 'POST',
    body: JSON.stringify({ message: userMessage })
  });
  const data = await response.json();
  return data.reply;
};
```

---

## 💰 Cost Comparison

| Option | Setup Time | Monthly Cost | Customization |
|--------|-----------|--------------|---------------|
| **Chatbase** | 15 min | $0 (50 msgs) → $19 | Medium |
| **OpenAI + Lambda** | 2-3 hrs | ~$5-10 | Full |
| **Keep Current** | Done! | $0 | Full (but dumb) |

---

## 🧪 Test Your Current Chatbot

```bash
npm run dev
```

Visit: http://localhost:5173

1. Click the **purple chat button** (bottom-right)
2. Try asking:
   - "What are Si's skills?"
   - "Tell me about experience"
   - "Show me projects"
   - "How to contact?"

---

## 📞 Next Steps

**Ready to upgrade?**

1. **Quick Win (15 min):** Set up Chatbase
   - Follow "Option 1" steps above
   - Train it on your resume
   - Done!

2. **Want Full Control (2-3 hrs):** OpenAI + Lambda
   - Let me know, I'll create the backend code
   - More work, but unlimited customization

3. **Happy with Current:** Keep the custom UI
   - It already looks great!
   - Shows your coding skills
   - Costs $0

**Which path do you want to take?** 🚀

---

## 📚 Resources

- [Chatbase Documentation](https://docs.chatbase.co/)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [AWS Lambda Tutorial](https://docs.aws.amazon.com/lambda/)
- [Voiceflow Docs](https://docs.voiceflow.com/)

---

**Made with ❤️ for Si Li's Portfolio**

Last Updated: November 2025

