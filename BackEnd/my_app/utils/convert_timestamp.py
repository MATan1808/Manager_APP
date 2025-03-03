from datetime import datetime, timezone, timedelta

# Nhập Unix Timestamp từ bàn phím cho iat và exp
iat = int(input("Nhập 'iat' (Issued At - thời điểm tạo token): "))
exp = int(input("Nhập 'exp' (Expiration - thời điểm hết hạn token): "))

# Chuyển timestamp thành thời gian UTC
iat_utc = datetime.fromtimestamp(iat, tz=timezone.utc)
exp_utc = datetime.fromtimestamp(exp, tz=timezone.utc)

# Chuyển sang múi giờ Việt Nam (GMT+7)
iat_vn = iat_utc + timedelta(hours=7)
exp_vn = exp_utc + timedelta(hours=7)

# Hiển thị kết quả
print("\n=== KẾT QUẢ CHUYỂN ĐỔI ===")
print("\n=========Token khởi tạo=======================")
print(f"Issued At (iat) - UTC: {iat_utc.strftime('%Y-%m-%d %H:%M:%S %Z')}")
print(f"Issued At (iat) - Việt Nam: {iat_vn.strftime('%Y-%m-%d %H:%M:%S')} (GMT+7)")
print("\n================================")
print("\n")

# kiểm tra token hết hạn
print("\n=========Token exp=======================") #
print(f"Expiration (exp) - UTC: {exp_utc.strftime('%Y-%m-%d %H:%M:%S %Z')}")
print(f"Expiration (exp) - Việt Nam: {exp_vn.strftime('%Y-%m-%d %H:%M:%S')} (GMT+7)")
if exp_utc < datetime.now(timezone.utc):
    print("Token đã hết hạn!")
else:
    print("Token chưa hết hạn!")

