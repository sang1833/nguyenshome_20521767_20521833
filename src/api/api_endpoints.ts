// Login
export const LOGIN = "/customers/loginCustomer";
export const getLoginBody = (email: string, password: string) => ({
  customerEmail: email,
  customerPassword: password,
});
// Login google and facebook
export const LOGIN_GOOGLE = "/customers/loginGoogleAndFacebookCustomer";
export const getLoginGoogleBody = (
  password: string,
  firstname: string,
  lastname: string,
  birthday: Date,
  email: string,
  gender: string,
  provider: string
) => ({
  customerPassword: password,
  customerFirstName: firstname,
  customerLastName: lastname,
  customerBirthday: birthday,
  customerEmail: email,
  customerGender: gender,
  customerProvider: provider,
});
// google login callback
// export const GOOGLE_LOGIN_CALLBACK = "/auth/google/callback";

// goggle login success
export const GOOGLE_LOGIN_SUCCESS = "/auth/google/login/success";

// logout google
// export const GOOGLE_LOGOUT = "/auth/google/logout";

// Signup
export const SIGNUP = "/customers/registerCustomer";
export const getSignupBody = (
  password: string,
  firstname: string,
  lastname: string,
  birthday: string,
  email: string,
  gender: string
) => ({
  customerPassword: password,
  customerFirstName: firstname,
  customerLastName: lastname,
  customerBirthday: birthday,
  customerEmail: email,
  customerGender: gender,
});
//Forgot passwords
export const FORGOT_PASSWORD = "/customers/forgetPasswordCustomer";
export const getForgotPasswordBody = (email: string) => ({
  customerEmail: email,
});
//Reset passwords
export const RESET_PASSWORD = "/customers/resetPasswordCustomer";
export const getResetPasswordBody = (
  email: string,
  OTP: string,
  newPassword: string
) => ({
  customerIdToken: email,
  customerOTP: OTP,
  customerPassword: newPassword,
});
//Change passwords
export const CHANGE_PASSWORD = "/customers/changePasswordCustomer";
export const getChangePasswordBody = (
  idToken: string,
  oldPassword: string,
  newPassword: string
) => ({
  customerIdToken: idToken,
  customerOldPassword: oldPassword,
  customerNewPassword: newPassword,
});
//Get OTP from email
export const GET_OTP = "/customers/verifyCustomerAfterSendOTP";
export const getOTPBody = (idToken: string, OTP: string) => ({
  customerIdToken: idToken,
  customerOTP: OTP,
});
//Verify OTP
export const VERIFY_OTP = "/customers/sendOTPCustomer";
export const sendOTPCustomer = (email: string) => ({
  customerEmail: email,
});

//Logout
export const LOGOUT = (id: string) => `/customers/logoutCustomer/${id}`;
export const logoutCustomer = (id: string) => ({
  params: {
    customerId: id,
  },
});

//Get user info
export const GET_USER_INFO = (id: string) => `/customers/getCustomerById/${id}`;
//update customer
export const UPDATE_CUSTOMER = (id: string) =>
  `/customers/updateCustomer/${id}`;
export const getUpdateCustomerBody = (
  firstname: string,
  lastname: string,
  birthday: string,
  email: string,
  gender: string
) => ({
  customerFirstName: firstname,
  customerLastName: lastname,
  customerBirthday: birthday,
  customerEmail: email,
  customerGender: gender,
});

//Get avatar
export const GET_AVATAR = `/customers/getCustomerAvatar`;
export const getAccessToken = (token: string) => ({
  headers: {
    Authorization: "Bearer " + token,
  },
});

//Get avatar URL
export const GET_AVATAR_URL = `/customers/getCustomerAvatarURL`;

//Get customer avatar URL by id
export const GET_AVATAR_URL_BY_ID = (id: string) =>
  `/customers/getCustomerAvatarURLById/${id}`;

//save avatar
export const SAVE_AVATAR = `/customers/saveCustomerAvatar`;
export const getSaveAvatarBody = (avatar: File) => ({
  customerAvatar: avatar,
});

//create address
export const CREATE_ADDRESS = (id: string) => `/addresses/createAddress/${id}`;
export const getCreateAddressBody = (
  firstname: string,
  lastname: string,
  phone: string,
  address: string,
  ward: string,
  district: string,
  city: string,
  isDefault: boolean
) => ({
  receiverFirstName: firstname,
  receiverLastName: lastname,
  receiverPhone: phone,
  receiverAddress: address,
  receiverWard: ward,
  receiverDistrict: district,
  receiverCity: city,
  isDefault: isDefault,
});

export const UPDATE_ADDRESS = (id: string) => `/addresses/updateAddress/${id}`;

//delete address
export const DELETE_ADDRESS = (id: string) => `/addresses/deleteAddress/${id}`;

//get all customer address
export const GET_ALL_ADDRESS = (id: string) =>
  `/addresses/getAllCustomerAddresses/${id}`;

//get address by id
export const GET_ADDRESS_BY_ID = (id: string) =>
  `/addresses/getAddressById/${id}`;

//set default address
export const SET_DEFAULT_ADDRESS = (id: string) =>
  `/addresses/setDefaultAddress/${id}`;

//get subcategories
export const GET_SUBCATEGORIES = "/subcategories/getAllSubcategories";
//get subcategories by id
export const GET_SUBCATEGORIES_BY_ID = (id: string) =>
  `/subcategories/getSubCategoryById/${id}`;

//get categories
export const GET_CATEGORIES = "/categories/getAllCategories";
//get categories by id
export const GET_CATEGORIES_BY_ID = (id: string) =>
  `/categories/getCategoryById/${id}`;
//get all products
export const GET_ALL_PRODUCTS = "/products/getAllProducts";
//get product images url
export const GET_PRODUCT_IMAGES_URL = (id: string) =>
  `/products/getAllProductImageURLs/${id}`;
//get product by id
export const GET_PRODUCT_BY_ID = (id: string) =>
  `/products/getProductById/${id}`;
//get all product color
export const GET_ALL_PRODUCT_COLORS = (id: string) =>
  `/products/getAllProductColors/${id}`;
//get all product images
export const GET_ALL_PRODUCT_IMAGES = (id: string) =>
  `/products/getAllProductImages/${id}`;
//get product images by color id
export const GET_PRODUCT_IMAGES_BY_COLOR = (pid: string, cid: string) =>
  `/products/getAllProductImagesByColor/${pid}/${cid}`;
// get product images url by color id
export const GET_PRODUCT_IMAGES_URL_BY_COLOR = (pid: string, cid: string) =>
  `/products/getAllProductImageURLsByColor/${pid}/${cid}`;
// get product color by id
export const GET_PRODUCT_COLOR_BY_ID = (id: string) =>
  `/products/getProductColorById/${id}`;

//get all colors
export const GET_ALL_COLORS = "/colors/getAllColors";
//get color by id
export const GET_COLOR_BY_ID = (id: string) => `/colors/getColorById/${id}`;

//get product dimension by id
export const GET_PRODUCT_DIMENSION_BY_ID = (id: string) =>
  `/products/getProductDimension/${id}`;

//get product rating by id
export const GET_PRODUCT_RATING_BY_ID = (id: string) =>
  `/feedbacks/getProductRating/${id}`;

//get discount by id
export const GET_DISCOUNT_BY_ID = (id: string) =>
  `/discounts/getDiscountById/${id}`;

//get all valid discounts
export const GET_ALL_VALID_DISCOUNTS = "/discounts/getAllValidDiscounts";

//create cart
export const CREATE_CART = "/carts/createCart";
//get customer cart
export const GET_CUSTOMER_CART = `/carts/getCustomerCart`;
//get all cart items
export const GET_ALL_CART_ITEMS = (id: string) =>
  `/carts/getAllCartItems/${id}`;
//add item to cart
export const ADD_ITEM_TO_CART = (id: string) => `/carts/addItemToCart/${id}`;
export const getAddItemToCartBody = (
  id: string,
  colorId: string,
  quantity: number
) => ({
  productId: id,
  productColorId: colorId,
  productQuantity: quantity,
});
//update item in cart
export const UPDATE_ITEM_IN_CART = (id: string) =>
  `/carts/updateItemInCart/${id}`;
//remove item from cart
export const REMOVE_ITEM_FROM_CART = (id: string) =>
  `/carts/removeItemFromCart/${id}`;
export const getRemoveItemFromCartBody = (
  productId: string,
  colorId: string
) => ({
  productId: productId,
  productColorId: colorId,
});
//remove all items from cart
export const REMOVE_ALL_ITEMS_FROM_CART = (id: string) =>
  `/carts/removeAllItemsFromCart/${id}`;

//create order
export const CREATE_ORDER = "/orders/createOrder";
export const getCreateOrderBody = (
  customerId: string,
  orderCode: string,
  orderStatus: string,
  orderNote: string,
  orderAddress: string,
  paymentMethod: string,
  orderShippingFee: number,
  voucherId?: string
) => ({
  customerId: customerId,
  orderCode: orderCode,
  orderStatus: orderStatus,
  orderNote: orderNote,
  orderAddress: orderAddress,
  paymentMethod: paymentMethod,
  orderShippingFee: orderShippingFee,
  voucherId: voucherId ? voucherId : null,
});

//create order item
export const CREATE_ORDER_ITEM = "/orders/createOrderItem";
export const getCreateOrderItemBody = (
  orderId: string,
  productId: string,
  productColorId: string,
  productQuantity: number,
  productPrice: number,
  productSalePrice: number
) => ({
  orderId: orderId,
  productId: productId,
  productColorId: productColorId,
  productQuantity: productQuantity,
  productPrice: productPrice,
  productSalePrice: productSalePrice,
});

//get all orders for customer
export const GET_ALL_ORDERS_FOR_CUSTOMER = `/orders/getAllOrdersForCustomer`;

//get order by id
export const GET_ORDER_BY_ID = (id: string) => `/orders/getOrderById/${id}`;

//get order items for order
export const GET_ORDER_ITEMS_FOR_ORDER = (id: string) =>
  `/orders/getOrderItemsForOrder/${id}`;

//get customer wishlist
export const GET_CUSTOMER_WISHLIST = `/wishlist/getCustomerWishlist`;

//add or remove product from wishlist
export const ADD_OR_REMOVE_PRODUCT_FROM_WISHLIST = (id: string) =>
  `/wishlist/addOrRemoveProductFromWishlist/${id}`;

//get all product feedbacks
export const GET_ALL_PRODUCT_FEEDBACKS = (id: string) =>
  `/feedbacks/getAllProductFeedbacks/${id}`;

//get feedback by id
export const GET_FEEDBACK_BY_ID = (id: string) =>
  `/feedbacks/getFeedbackById/${id}`;

//create feedback
export const CREATE_FEEDBACK = "/feedbacks/createFeedback";
export const getCreateFeedbackBody = (
  customerId: string,
  productId: string,
  productColorId: string,
  orderId: string,
  feedbackRating: number,
  feedbackTitle: string,
  feedbackContent: string
) => ({
  customerId: customerId,
  productId: productId,
  productColorId: productColorId,
  orderId: orderId,
  feedbackRating: feedbackRating,
  feedbackTitle: feedbackTitle,
  feedbackContent: feedbackContent,
});

//delete feedback
export const DELETE_FEEDBACK = (id: string) =>
  `/feedbacks/deleteFeedback/${id}`;

//get all feedback images
export const GET_ALL_FEEDBACK_IMAGES = (id: string) =>
  `/feedbacks/getAllFeedbackImages/${id}`;

//save feedback images
export const SAVE_FEEDBACK_IMAGES = (id: string) =>
  `/feedbacks/saveFeedbackImage/${id}`;
//delete feedback images
export const DELETE_FEEDBACK_IMAGES = (id: string) =>
  `/feedbacks/deleteFeedbackImage/${id}`;

//preview attachment
export const PREVIEW_ATTACHMENT = (id: string) =>
  `/attachments/previewAttachment/${id}`;

//get all blog posts
export const GET_ALL_BLOG_POSTS = (
  search: string,
  page: number,
  limit: number
) => `/posts/getAllBlogPosts/${search}/${page}/${limit}`;

//get blog post by id
export const GET_BLOG_POST_BY_ID = (id: string) =>
  `/posts/getBlogPostById/${id}`;

// get latest blog posts
export const GET_LATEST_BLOG_POSTS = `/posts/getLatestBlogPosts`;

// conversation
export const CREATE_CONVERSATION = `/conversations/createConversationForCustomer`;

// get user conversations
export const GET_USER_CONVERSATION = `/conversations/getUserConversation`;

// get all messages for conversation
export const GET_ALL_MESSAGES_FOR_CONVERSATION = (id: string) =>
  `/messages/getAllMessagesForConversation/${id}`;

// create message
export const CREATE_MESSAGE = `/messages/createMessage`;
export const getCreateMessageBody = (
  senderId: string,
  conversationId: string,
  messageText: string
) => ({
  senderId: senderId,
  conversationId: conversationId,
  messageText: messageText,
});

export const GET_ALL_VALID_VOUCHERS = `/vouchers/getAllValidVouchers`;

// create vnpay payment
export const CREATE_VNPAY_PAYMENT = `/payments/createVNPayURL`;
export const getCreateVNPayPaymentBody = (
  amount: number,
  bankCode: string,
  language: string
) => ({
  amount: amount,
  bankCode: bankCode,
  language: language,
});

//get all payments
export const GET_ALL_PAYMENTS = `/payments/getAllPayments`;

// https://nguyenshomefurniture-be.onrender.com/api/payments/getVNPayReturn?
// vnp_Amount=528000000&
// vnp_BankCode=NCB&
// vnp_BankTranNo=VNP14287723&
// vnp_CardType=ATM&
// vnp_OrderInfo=Thanh+toan+cho+ma+GD%3A+140231&
// vnp_PayDate=20240119210957&
// vnp_ResponseCode=00&
// vnp_TmnCode=FXJUR0TP&
// vnp_TransactionNo=14287723&
// vnp_TransactionStatus=00&
// vnp_TxnRef=140231&
// vnp_SecureHash=522e622833b3be4fac4044a4efdb3216f19555e694446420151cda9f981161ba9cc654230413c162195a4858cd033d82f3f2649f545ea582a1a56f58c6a6e05b
//get vnpay return
export const GET_VNPAY_RETURN = `/payments/getVNPayReturn`;
// export const getVNPayReturnBody = (
//   vnp_Amount: string,
//   vnp_BankCode: string,
//   vnp_BankTranNo: string,
//   vnp_CardType: string,
//   vnp_OrderInfo: string,
//   vnp_PayDate: string,
//   vnp_ResponseCode: string,
//   vnp_TmnCode: string,
//   vnp_TransactionNo: string,
//   vnp_TransactionStatus: string,
//   vnp_TxnRef: string,
//   vnp_SecureHash: string
// ) => ({
//   vnp_Amount: vnp_Amount,
//   vnp_BankCode: vnp_BankCode,
//   vnp_BankTranNo: vnp_BankTranNo,
//   vnp_CardType: vnp_CardType,
//   vnp_OrderInfo: vnp_OrderInfo,
//   vnp_PayDate: vnp_PayDate,
//   vnp_ResponseCode: vnp_ResponseCode,
//   vnp_TmnCode: vnp_TmnCode,
//   vnp_TransactionNo: vnp_TransactionNo,
//   vnp_TransactionStatus: vnp_TransactionStatus,
//   vnp_TxnRef: vnp_TxnRef,
//   vnp_SecureHash: vnp_SecureHash,
// });
