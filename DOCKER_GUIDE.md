# คู่มือการรันแพลตฟอร์มด้วย Docker บน Windows (Quick Start Guide for Windows)

> **สำหรับเพื่อนที่ใช้งาน Windows**: ไม่จำเป็นต้องติดตั้ง Node.js หรือ pnpm บนเครื่อง เพียงแค่มี **Docker Desktop for Windows** ก็สามารถกดรันได้ทันที

---

## วิธีที่ 1: ดับเบิลคลิกไฟล์เดียวเพื่อเริ่มใช้งาน (แนะนำที่สุด)

1. เปิดโปรแกรม **Docker Desktop** บน Windows แล้วรอจนกระทั่งสถานะด้านล่างซ้ายขึ้นเป็นสีเขียว (`Engine running`)
2. ดับเบิลคลิกที่ไฟล์ **`run.bat`** (หรือคลิกขวาที่ `run.ps1` แล้วเลือก *Run with PowerShell*)
3. สคริปต์จะทำการ Build และ Start Container ให้โดยอัตโนมัติ พร้อมเปิดหน้าต่างเบราว์เซอร์ไปที่:
   ```text
   http://localhost:3000
   ```

---

## วิธีที่ 2: รันผ่าน Terminal / Command Prompt / PowerShell

เปิด PowerShell หรือ Command Prompt ในโฟลเดอร์โปรเจกต์ แล้วพิมพ์คำสั่ง:

```powershell
# 1. สั่ง Build และรันในพื้นหลัง
docker compose up --build -d

# 2. ดูสถานะและ Log
docker compose logs -f

# 3. เมื่อต้องการปิดการทำงาน
docker compose down
```

---

## วิธีที่ 3: รันด้วยคำสั่ง Docker เพียวๆ (กรณีไม่มี docker compose)

```powershell
# 1. Build Image
docker build -t interactive-lab .

# 2. รัน Container ที่ Port 3000
docker run -d -p 3000:3000 --name interactive-lab --restart unless-stopped interactive-lab

# 3. เปิดเบราว์เซอร์
start http://localhost:3000

# 4. หยุดการทำงาน
docker stop interactive-lab && docker rm interactive-lab
```

---

## ปัญหาที่พบบ่อยบน Windows และวิธีแก้ไข (Troubleshooting)

### 1. แจ้งเตือน `Docker Desktop is installed but not running`
- **วิธีแก้**: ให้ไปที่ Start Menu แล้วเปิดโปรแกรม **Docker Desktop** ขึ้นมาก่อน รอประมาณ 10-20 วินาทีให้ Service ทำงานสมบูรณ์

### 2. พอร์ต 3000 ชนกับโปรแกรมอื่น (Port 3000 is already in use)
- **วิธีแก้**: เปลี่ยนพอร์ตภายนอกใน `docker-compose.yml` จาก `"3000:3000"` เป็น `"8080:3000"` แล้วเข้าใช้งานผ่าน `http://localhost:8080`

### 3. ต้องการแชร์ให้เครื่องอื่นในวง Wi-Fi หรือแท็บเล็ตเปิดใช้งาน
- หา IP ของเครื่อง Windows โดยเปิด PowerShell แล้วพิมพ์ `ipconfig` (ดูค่า IPv4 Address เช่น `192.168.1.50`)
- จากนั้นบนแท็บเล็ต iPad หรือมือถือ ให้เปิดเบราว์เซอร์พิมพ์: `http://192.168.1.50:3000` สามารถใช้งานได้ทันที
