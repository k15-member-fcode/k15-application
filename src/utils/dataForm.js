export const dataForm = {
  personal: {
    fullname: {
      label: "Họ và tên",
      message: {
        required: "Vui lòng nhập họ tên của bạn.",
        validation: "Họ tên của bạn chứa ký tự không hợp lệ."
      },
      placeholder: "Họ và tên của bạn"
    },
    studentID: {
      label: "Mã sinh viên",
      message: {
        required: "Vui lòng nhập mã sinh viên của bạn.",
        validation: [
          "Mã sinh viên phải có định dạng 15xxxx, với x là số đếm.",
          "Mã sinh viên không đúng."
        ]
      },
      placeholder: "15xxxx"
    },
    major: {
      label: "Chuyên ngành",
      message: {
        required: "Vui lòng chọn chuyên ngành của bạn."
      }
    },
    gender: {
      label: "Giới tính",
      message: {
        required: "Vui lòng chọn giới tính của bạn."
      }
    },
    phoneNumber: {
      label: "Số diện thoại",
      message: {
        required: "Vui lòng nhập số điện thoại của bạn.",
        validation: "Số điện thoại bạn nhập không đúng."
      },
      placeholder: "0xxxxxxxxx"
    },
    facebook: {
      label: "Địa chỉ Facebook",
      message: {
        required: "Vui lòng nhập địa chỉ Facebook của bạn.",
        validation: "Địa chỉ Facebook bạn nhập không đúng."
      },
      placeholder: "https://facebook.com/xxxxx"
    }
  },
  ask: {
    message: {
      required: "Vui lòng trả lời câu hỏi này.",
      maxError: "Đã đạt số kí tự tối đa (500 kí tự).",
      minError: "Câu trả lời phải ít nhất 20 kí tự."
    },
    knowledge: {
      label: "Nêu một cách ngắn gọn hiểu biết của bạn về ngành này",
      placeholder:
        "Ngành này làm những việc gì, có những công việc gì, cần những kiến thức gì,..."
    },
    experience: {
      label: "Bạn có kinh nghiệm như thế nào trong lĩnh vực CNTT?",
      placeholder:
        "Biết được ngôn ngữ lập trình gì, đã từng tham gia những cuộc thi nào, đạt được những giải thưởng gì,..."
    },
    reason: {
      label: "Tại sao bạn lại muốn tham gia CLB F-Code?"
    },
    pros: {
      label: "Ưu điểm của bạn là gì?"
    },
    cons: {
      label: "Khuyết điểm của bạn là gì?"
    },
    expect: {
      label: "Điều bạn mong đợi khi tham gia CLB là gì?"
    },
    dedication: {
      label:
        "Nếu trở thành thành viên chính thức, bạn sẽ làm gì để phát triển CLB?"
    },
    question: {
      label: "Bạn có câu hỏi gì gửi đến CLB không?",
      placeholder: "Để trống nếu bạn không có câu hỏi nào"
    },
    otherClub: {
      label: "Ngoài F-Code, bạn còn tham gia CLB nào khác?",
      placeholder: "Để trống nếu bạn không tham gia CLB nào khác"
    }
  },
  confirm: {
    message: {
      required: "Vui lòng chọn một mục."
    },
    isReady: {
      label: "Bạn đã sẵn sàng chấp nhận thử thách chưa?",
      message: {
        validation: "Bạn chưa sẵn sàng tham gia thử thách của CLB."
      }
    },
    isRead: {
      label: "Bạn đã đọc hết toàn bộ thông tin của form này chưa?",
      message: {
        validation: "Bạn chưa đọc hết nội dung của form này."
      }
    }
  }
};
