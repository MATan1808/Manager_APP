-- Tạo bảng accounts để lưu số dư của từng user
CREATE TABLE accounts (
    account_id INT IDENTITY(1,1) PRIMARY KEY, -- ID tự động tăng, khóa chính của bảng accounts
    user_id INT UNIQUE NOT NULL, -- ID của user, mỗi user có 1 tài khoản duy nhất
    balance DECIMAL(18,2) NOT NULL DEFAULT 0, -- Số dư tài khoản, mặc định là 0
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- Ràng buộc với bảng users, nếu user bị xóa thì tài khoản cũng bị xóa
);
-- Bảng lưu lịch sử giao dịch chuyển tiền giữa các tài khoản
CREATE TABLE transactions (
    transaction_id INT IDENTITY(1,1) PRIMARY KEY, -- ID tự động tăng, khóa chính của bảng
    sender_user_id INT NOT NULL, -- ID người gửi tiền (tham chiếu từ users)
    receiver_user_id INT NOT NULL, -- ID người nhận tiền (tham chiếu từ users)
    amount DECIMAL(18,2) NOT NULL CHECK (amount > 0), -- Số tiền giao dịch, luôn phải lớn hơn 0
    transaction_date DATETIME DEFAULT GETDATE(), -- Thời gian giao dịch, mặc định là thời gian hiện tại
    FOREIGN KEY (sender_user_id) REFERENCES users(id), -- Liên kết với users để biết ai gửi tiền
    FOREIGN KEY (receiver_user_id) REFERENCES users(id) -- Liên kết với users để biết ai nhận tiền
);

-- Tạo stored procedure để chuyển tiền giữa hai tài khoản của người dùng
CREATE PROCEDURE TransferMoney1
    @sender_user_id INT, -- ID của user gửi tiền
    @receiver_user_id INT, -- ID của user nhận tiền
    @amount DECIMAL(18,2) -- Số tiền cần chuyển
AS
BEGIN
    SET NOCOUNT ON; -- Tắt thông báo không cần thiết

    BEGIN TRY
        -- Bắt đầu giao dịch
        BEGIN TRANSACTION;

        -- Kiểm tra số dư của người gửi
        IF (SELECT balance FROM accounts WHERE user_id = @sender_user_id) < @amount
        BEGIN
            RAISERROR('Số dư không đủ!', 16, 1); -- Báo lỗi nếu số dư không đủ
            ROLLBACK TRANSACTION; -- Hoàn tác giao dịch
            RETURN;
        END

        -- Trừ tiền người gửi
        UPDATE accounts
        SET balance = balance - @amount
        WHERE user_id = @sender_user_id;

        -- Cộng tiền vào tài khoản người nhận
        UPDATE accounts
        SET balance = balance + @amount
        WHERE user_id = @receiver_user_id;

        -- Ghi lại lịch sử giao dịch
        INSERT INTO transactions (sender_user_id, receiver_user_id, amount)
        VALUES (@sender_user_id, @receiver_user_id, @amount);

        -- Hoàn tất giao dịch
        COMMIT TRANSACTION;
        PRINT 'Money transfer sussecly!';
    END TRY
    BEGIN CATCH
        -- Nếu có lỗi, hoàn tác giao dịch
        ROLLBACK TRANSACTION;
        PRINT 'Money transfer failed!';
    END CATCH
END;
--- chuyển tiền
EXEC TransferMoney1 @sender_user_id = 3, @receiver_user_id = 4, @amount = 30000;

SELECT * FROM transactions ORDER BY transaction_date DESC;




INSERT INTO accounts (user_id, balance) VALUES
(1, 50000),   -- OK vì user_id=1 có trong users
(3, 100000),  -- OK vì user_id=3 có trong users
(4, 75000),   -- OK vì user_id=4 có trong users
(6, 120000),  -- OK vì user_id=6 có trong users
(7, 60000),   -- OK vì user_id=7 có trong users
(8, 90000);   -- OK vì user_id=8 có trong users


UPDATE accounts
SET balance = balance + 50000
WHERE user_id = 1;

UPDATE accounts
SET balance = balance + 100000
WHERE user_id = 3;

UPDATE accounts
SET balance = balance + 75000
WHERE user_id = 4;

UPDATE accounts
SET balance = balance + 120000
WHERE user_id = 6;

UPDATE accounts
SET balance = balance + 60000
WHERE user_id = 7;

UPDATE accounts
SET balance = balance + 90000
WHERE user_id = 8;

--hiển thị số dư của mỗi tài khoản
select * from accounts

--- hiển thị giao dịch
SELECT 
    t.transaction_id,
    t.sender_user_id,
    sender.username AS sender_name,
    t.receiver_user_id,
    receiver.username AS receiver_name,
    t.amount,
    t.transaction_date
FROM transactions t
JOIN users sender ON t.sender_user_id = sender.id
JOIN users receiver ON t.receiver_user_id = receiver.id
ORDER BY t.transaction_date DESC;

