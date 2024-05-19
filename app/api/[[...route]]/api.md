# SQL Query Explanation for Transactions route

## 1, Transactions get method

### SELECT Statement

The query retrieves specific columns from the database:

- `id`: Unique identifier for each transaction.
- `date`: Date of the transaction.
- `category`: Name of the transaction category.
- `categoryId`: Unique identifier for each category.
- `payee`: Payee associated with the transaction.
- `amount`: Transaction amount.
- `notes`: Additional notes related to the transaction.
- `account`: Name of the account associated with the transaction.
- `accountId`: Unique identifier for each account.

### FROM Clause

Data is fetched from the `transactions` table.

### JOIN Clauses

1. **Inner Join (`innerJoin`)**:

   - Combines data from `transactions` and `accounts` tables.
   - Condition: `transactions.accountId` matches `accounts.id`.

2. **Left Join (`leftJoin`)**:
   - Combines data from `transactions` and `categories` tables.
   - Condition: `transactions.categoryId` matches `categories.id`.

### WHERE Clause

Filters the rows based on conditions:

- If `accountId` is provided, it checks whether `transactions.accountId` matches the provided value.
- Ensures transactions belong to the user identified by `auth.userId`.
- Filters by transaction date falling within the specified range (`startDate` to `endDate`).

### ORDER BY Clause

Results are ordered by `transactions.date` in descending order.

### Summary:

Your query retrieves data from the `transactions` table, joins it with the `accounts` and `categories` tables, applies filtering conditions, and sorts the results by date.

## 2, Transactions get by id method

### SELECT Statement

The select method specifies which columns to retrieve from the database. Columns included:

- `id`: Represents the unique identifier for each transaction.
- `date`: Indicates the date of the transaction.
- `categoryId`: Represents the unique identifier for each category.
- `payee`: Indicates the payee (recipient) associated with the transaction.
- `amount`: Represents the transaction amount.
- `notes`: Contains any additional notes related to the transaction.
- `accountId`: Represents the unique identifier for each account.

### FROM Clause

The from method specifies the table from which the data is retrieved (in this case, the transactions table).

### JOIN Clause (Inner Join)

The innerJoin method joins the accounts table with the `transactions` table. The condition for the join is that `transactions.accountId` must match `accounts.id`.

### WHERE Clause

The where method filters the rows based on conditions:

`transactions.id` must match a specific value (id).
`accounts.userId` must match a specific value (auth.userId).

### Summary

The code constructs a database query that retrieves specific columns from the `transactions` table, joins it with the `accounts` table using an `inner join`, and applies filtering conditions based on `transaction IDs` and `user IDs`.

## 3, Transactions bulk delete method

### Common Table Expression (CTE):

`transactionsToDelete` A CTE named `transactions_to_delete` is created using the `db.$with` method. The CTE retrieves the `id` column from the transactions table.

### It performs the following steps:

Joins the `transactions` table with the `accounts` table using an `inner join`.

## Filters the rows based on the following conditions:

The `transactions.id` must be present in the `values.ids` array.
The `accounts.id` must match the `auth.userId`.

### data Deletion Query:

The main query deletes records from the `transactions` table.

## Here’s what each part of the query does:

### WITH Clause:

The with clause specifies that we are using the previously defined `CTE (transactionsToDelete)`.
This allows us to reference the CTE within the main query.

### DELETE Statement:

The delete method specifies the table (transactions) from which data will be deleted.

### The where method filters the rows based on the following condition:

The `transactions.id` must be present in the `subquery` result obtained from the `CTE (transactionsToDelete)`.

### RETURNING Clause:

The returning clause specifies that we want to retrieve the id column of the deleted records.

### Summary:

The code first creates a `CTE (transactions_to_delete)` that selects `transaction IDs` based on specific criteria.

Then, it performs a deletion operation on the `transactions` table, using the `CTE` to filter the rows to be deleted.
The data array will contain the `IDs` of the `deleted transactions`.

## 4, Transactions update by id

### Common Table Expression (CTE):

A CTE named `transactions_to_update` is created using the `db.$with` method.

The purpose of this CTE is to `select transaction IDs` based on specific criteria.

### Here’s what each part of the CTE does:

### SELECT Statement:

The select method specifies that we want to retrieve the `id` column from the `transactions` table.
The query fetches `transaction IDs`.

### FROM Clause:

The from method specifies the table (transactions) from which data will be retrieved.

### JOIN Clause (Inner Join):

The `innerJoin` method joins the `accounts table` with the `transactions table`.
The condition for the join is that `transactions.accountId` must match `accounts.id`.

### WHERE Clause:

#### The where method filters the rows based on the following conditions:

`transactions.id` must match a specific `value (id)`.
`accounts.id` must match the authenticated `user’s ID (auth.userId)`.

### Data Update Query:

The main query updates records in the transactions table.

### Here’s what each part of the query does:

#### WITH Clause:

The with clause specifies that we are using the previously defined `CTE (transactionsToUpdate)`.
This allows us to reference the CTE within the main query.

#### UPDATE Statement:

The update method specifies the table (transactions) where data will be updated.
The set method assigns new values to specific columns (e.g., values).

### WHERE Clause:

#### The where method filters the rows based on the following condition:

The `transactions.id` must be present in the `subquery` result obtained from the `CTE (transactionsToUpdate)`.

### RETURNING Clause:

The returning clause specifies that we want to retrieve information (e.g., IDs) about the updated records.

### Summary:

The code constructs an update query that modifies transaction records in the `transactions` table based on specific conditions.
The `[data]` array will contain information about the `updated transactions (e.g., updated IDs)`.

## 5, Transactions Deletion method

### Common Table Expression (CTE):

A Common Table Expression (CTE) named `transactions_to_delete` is created using the `db.$with` method.

The purpose of this CTE is to `select transaction IDs` based on specific criteria.

### Here’s what each part of the CTE does:

#### SELECT Statement:

The select method specifies that we want to retrieve the `id` column from the `transactions table`.
The query `fetches transaction IDs`.

#### FROM Clause:

The from method specifies the table (transactions) from which data will be retrieved.

### JOIN Clause (Inner Join):

The `innerJoin` method joins the `accounts table` with the `transactions table`.
The condition for the join is that `transactions.accountId` must match `accounts.id`.

#### WHERE Clause:

The where method filters the rows based on the following conditions:
`transactions.id` must match a specific `value (id)`.
`accounts.id` must match the authenticated `user’s ID (auth.userId)`.

### Data Deletion Query:

The main query deletes records from the transactions table.

#### Here’s what each part of the query does:

#### WITH Clause:

The with clause specifies that we are using the previously defined `CTE (transactionsToDelete)`.
This allows us to reference the CTE within the main query.

#### DELETE Statement:

The delete method specifies the table (transactions) from which data will be deleted.

#### The where method filters the rows based on the following condition:

The `transactions.id` must be present in the `subquery` result obtained from the `CTE (transactionsToDelete)`.

#### RETURNING Clause:

The returning clause specifies that we want to retrieve information (e.g., IDs) about the deleted records.

### Summary:

The code constructs a deletion query that removes transaction records from the `transactions table` based on specific conditions.
The `[data]` array will contain information about the deleted transactions (e.g., deleted IDs).
