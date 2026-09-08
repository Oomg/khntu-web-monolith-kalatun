# Лабораторна робота №1: Початкова архітектура проєкту

**Студент:** Калатун Євгеній Володимирович (Група 2Прс)
**Варіант 1:** B2C Інтернет-магазин електроніки

## Опис предметної області
Система представляє собою бекенд для інтернет-магазину. 
- **Сутності:** User (Користувач), Category (Категорія), Product (Товар), Order (Замовлення), OrderItem (Деталі замовлення).
- **Зв'язки:** 
  - `Category` 1:N `Product` (в одній категорії багато товарів).
  - `User` 1:N `Order` (один користувач може зробити багато замовлень).
  - `Order` N:M `Product` через проміжну таблицю `OrderItem` (замовлення містить багато товарів, товар може бути в багатьох замовленнях). У проміжній таблиці зберігається кількість (`quantity`) та ціна на момент покупки (`priceAtPurchase`).
- **Ролі користувачів:** USER (Покупець), MANAGER (Менеджер магазину), ADMIN (Системний адмін).

## ER-діаграма (Mermaid)

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    CATEGORY ||--|{ PRODUCT : contains
    ORDER ||--|{ ORDER_ITEM : includes
    PRODUCT ||--o{ ORDER_ITEM : order_details

    USER {
        int id PK
        string email
        string role
    }
    CATEGORY {
        int id PK
        string name
    }
    PRODUCT {
        int id PK
        int categoryId FK
        string title
        float price
    }
    ORDER {
        int id PK
        int userId FK
        float totalAmount
    }
    ORDER_ITEM {
        int id PK
        int orderId FK
        int productId FK
        int quantity
        float priceAtPurchase
    }