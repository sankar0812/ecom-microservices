Microservices in E-Commerce
-----------------------------

User Service → manages users and authentication.

Product Service → manages products, categories, inventory.

Order Service → handles orders and payments.

Cart Service → manages shopping cart.

Notification Service → sends emails, SMS, push notifications.


Flow Example with Payment:
-----------------------------

User places order → Order Service receives it → saves as pending.

Order Service publishes order_created to Kafka.

Payment Service subscribes to order_created topic → initiates payment process.

Payment Service publishes payment_success or payment_failed events to Kafka.

Order Service consumes payment_success → updates order status to completed.

Notification Service consumes payment_success → sends confirmation email/SMS.

-------------------------------------------------------------------------------------------------

ecommerce-microservices/
├── api-gateway/
│   ├── src/
│   │   └── index.js
│   ├── package.json
├── services/
│   ├── user-service/
│   ├── product-service/
│   ├── order-service/
│   ├── cart-service/
│   ├── payment-service/
│   ├── inventory-service/
│   └── notification-service/
├── docker-compose.yml
└── README.md
