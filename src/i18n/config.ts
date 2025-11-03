import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Common
      "welcome": "Welcome to SAMHITA",
      "tagline": "Empowering artisans, connecting communities",
      "buyer": "BUYER",
      "seller": "SELLER (ARTISAN)",
      "login": "Login",
      "signup": "Sign Up",
      "logout": "Logout",
      "continue": "Continue",
      "submit": "Submit",
      "cancel": "Cancel",
      "back": "Back",
      "next": "Next",
      "save": "Save",
      "edit": "Edit",
      "delete": "Delete",
      "search": "Search",
      "filter": "Filter",
      "sort": "Sort by",
      "addToCart": "Add to Cart",
      "buyNow": "Buy Now",
      "viewCart": "View Cart",
      "checkout": "Checkout",
      "total": "Total",
      "subtotal": "Subtotal",
      "shipping": "Shipping",
      "tax": "Tax",
      
      // Auth
      "email": "Email",
      "password": "Password",
      "confirmPassword": "Confirm Password",
      "forgotPassword": "Forgot Password?",
      "resetPassword": "Reset Password",
      "continueWithGoogle": "Continue with Google",
      "alreadyHaveAccount": "Already have an account?",
      "dontHaveAccount": "Don't have an account?",
      "signInToContinue": "Sign in to continue",
      "createAccount": "Create your account",
      "resetPasswordInstructions": "Enter your email and we'll send you a reset link",
      "backToLogin": "Back to Login",
      
      // Marketplace
      "marketplace": "Marketplace",
      "discover": "Discover",
      "categories": "Categories",
      "featuredProducts": "Featured Products",
      "newArrivals": "New Arrivals",
      "trending": "Trending",
      "viewDetails": "View Details",
      "productDetails": "Product Details",
      "description": "Description",
      "artisanStory": "Artisan Story",
      "reviews": "Reviews",
      "rating": "Rating",
      "inStock": "In Stock",
      "outOfStock": "Out of Stock",
      
      // Seller
      "sellerOnboarding": "List Your Craft",
      "productName": "Product Name",
      "productDescription": "Product Description",
      "price": "Price",
      "category": "Category",
      "materials": "Materials",
      "craftType": "Craft Type",
      "region": "Region",
      "uploadPhotos": "Upload Photos",
      "aiAssistance": "AI Assistance",
      "generateStory": "Generate Story",
      "analyzeImage": "Analyze Image",
      "preview": "Preview",
      "publish": "Publish",
      "draft": "Save as Draft",
      
      // Cart & Checkout
      "cart": "Shopping Cart",
      "emptyCart": "Your cart is empty",
      "continueShopping": "Continue Shopping",
      "proceedToCheckout": "Proceed to Checkout",
      "orderSummary": "Order Summary",
      "shippingAddress": "Shipping Address",
      "paymentMethod": "Payment Method",
      "placeOrder": "Place Order",
      "orderConfirmation": "Order Confirmation",
      "thankYouForOrder": "Thank you for your order!",
      "orderNumber": "Order Number",
      "estimatedDelivery": "Estimated Delivery",
      
      // Location
      "location": "Location",
      "findNearby": "Find Nearby",
      "eventsNearYou": "Events Near You",
      "artisansNearYou": "Artisans Near You",
      
      // AR
      "arPreview": "AR Preview",
      "enableAR": "Enable AR Preview",
      "viewIn3D": "View in 3D",
      "rotateToExplore": "Rotate to explore"
    }
  },
  hi: {
    translation: {
      // Common
      "welcome": "SAMHITA में आपका स्वागत है",
      "tagline": "शिल्पकारों को सशक्त बनाना, समुदायों को जोड़ना",
      "buyer": "खरीदार",
      "seller": "विक्रेता (शिल्पकार)",
      "login": "लॉगिन",
      "signup": "साइन अप",
      "logout": "लॉगआउट",
      "continue": "जारी रखें",
      "submit": "सबमिट करें",
      "cancel": "रद्द करें",
      "back": "पीछे",
      "next": "आगे",
      "save": "सहेजें",
      "edit": "संपादित करें",
      "delete": "हटाएं",
      "search": "खोजें",
      "filter": "फ़िल्टर",
      "sort": "क्रमबद्ध करें",
      "addToCart": "कार्ट में जोड़ें",
      "buyNow": "अभी खरीदें",
      "viewCart": "कार्ट देखें",
      "checkout": "चेकआउट",
      "total": "कुल",
      "subtotal": "उप-योग",
      "shipping": "शिपिंग",
      "tax": "कर",
      
      // Auth
      "email": "ईमेल",
      "password": "पासवर्ड",
      "confirmPassword": "पासवर्ड की पुष्टि करें",
      "forgotPassword": "पासवर्ड भूल गए?",
      "resetPassword": "पासवर्ड रीसेट करें",
      "continueWithGoogle": "Google के साथ जारी रखें",
      "alreadyHaveAccount": "पहले से खाता है?",
      "dontHaveAccount": "खाता नहीं है?",
      "signInToContinue": "जारी रखने के लिए साइन इन करें",
      "createAccount": "अपना खाता बनाएं",
      "resetPasswordInstructions": "अपना ईमेल दर्ज करें और हम आपको रीसेट लिंक भेजेंगे",
      "backToLogin": "लॉगिन पर वापस जाएं",
      
      // Marketplace
      "marketplace": "बाजार",
      "discover": "खोजें",
      "categories": "श्रेणियां",
      "featuredProducts": "विशेष उत्पाद",
      "newArrivals": "नए आगमन",
      "trending": "ट्रेंडिंग",
      "viewDetails": "विवरण देखें",
      "productDetails": "उत्पाद विवरण",
      "description": "विवरण",
      "artisanStory": "शिल्पकार की कहानी",
      "reviews": "समीक्षाएं",
      "rating": "रेटिंग",
      "inStock": "स्टॉक में",
      "outOfStock": "स्टॉक से बाहर",
      
      // Seller
      "sellerOnboarding": "अपनी कला सूचीबद्ध करें",
      "productName": "उत्पाद का नाम",
      "productDescription": "उत्पाद विवरण",
      "price": "मूल्य",
      "category": "श्रेणी",
      "materials": "सामग्री",
      "craftType": "शिल्प प्रकार",
      "region": "क्षेत्र",
      "uploadPhotos": "फोटो अपलोड करें",
      "aiAssistance": "AI सहायता",
      "generateStory": "कहानी बनाएं",
      "analyzeImage": "छवि का विश्लेषण करें",
      "preview": "पूर्वावलोकन",
      "publish": "प्रकाशित करें",
      "draft": "ड्राफ्ट के रूप में सहेजें",
      
      // Cart & Checkout
      "cart": "शॉपिंग कार्ट",
      "emptyCart": "आपकी कार्ट खाली है",
      "continueShopping": "खरीदारी जारी रखें",
      "proceedToCheckout": "चेकआउट के लिए आगे बढ़ें",
      "orderSummary": "आदेश सारांश",
      "shippingAddress": "शिपिंग पता",
      "paymentMethod": "भुगतान का तरीका",
      "placeOrder": "आदेश दें",
      "orderConfirmation": "आदेश पुष्टिकरण",
      "thankYouForOrder": "आपके आदेश के लिए धन्यवाद!",
      "orderNumber": "आदेश संख्या",
      "estimatedDelivery": "अनुमानित डिलीवरी",
      
      // Location
      "location": "स्थान",
      "findNearby": "पास में खोजें",
      "eventsNearYou": "आपके पास की घटनाएं",
      "artisansNearYou": "आपके पास के शिल्पकार",
      
      // AR
      "arPreview": "AR पूर्वावलोकन",
      "enableAR": "AR पूर्वावलोकन सक्षम करें",
      "viewIn3D": "3D में देखें",
      "rotateToExplore": "अन्वेषण के लिए घुमाएं"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
