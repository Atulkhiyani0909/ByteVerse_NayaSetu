# NyayaSetu: Comprehensive Government Services and Legal Assistance Platform

NyayaSetu is a unified platform designed to provide solutions for government services and legal assistance. It streamlines the process of submitting complaints, tracking their status, and resolving queries related to government services while offering users the ability to connect with legal professionals for personalized advice.

This README explains the functionalities, workflows, and features of NyayaSetu.


## Overview of NyayaSetu

NyayaSetu aims to bridge the gap between citizens and government services by offering a centralized platform for complaint management, legal assistance, and administrative reporting. The system integrates various components to ensure smooth operations while providing users with real-time updates and access to legal professionals.

---

## Key Features of NyayaSetu

### 1. **User Authentication & Registration**
- **Purpose**: To ensure secure access to the platform.
- **Options**:
  - Users can register via OTP or email verification.
  - Returning users can log in securely using JWT authentication.
  - Guest users can submit complaints without registration but with limited functionality.

---

### 2. **Home Dashboard**
- **Purpose**: Acts as the central hub for navigation.
- **Features**:
  - Provides access to complaint submission forms.
  - Displays summaries of complaints and their statuses.
  - Offers navigation to legal assistance options.

---

### 3. **Complaint Categories**
- **Purpose**: Organizes complaints into structured categories based on government services.
- **Examples**:
  - Railway services
  - Municipal services
  - Public infrastructure
  - Healthcare-related issues
  - Education-related concerns

---

### 4. **Raise Complaint**
- **Purpose**: Allows users to submit detailed complaints related to government services.
- **Process**:
  - Users select a category relevant to their issue.
  - Provide descriptions and optional attachments (e.g., photos or documents).
  
---

## Guest User Management

### 5. **Guest Complaints Threshold**
- **Purpose**: Prevents abuse by guest users while allowing limited access.
- **Functionality**:
  - Guest users can submit up to five complaints without verification.
  - If this threshold is exceeded, ID proof is required for further submissions.

---

## Ticket Management System

### 6. **Ticket Creation**
- Complaints are converted into tickets for tracking and resolution.

### 7. **Track Status**
- Users can monitor the progress of their complaint in real-time through the dashboard.

### 8. **Download Acknowledgment**
- Upon submission, users receive an acknowledgment receipt containing:
  - Ticket number
  - Submission date
  - Complaint category

---

## Department Notification & Action

### 9. **Notify Department Heads**
- Complaints are routed to relevant departments based on their category.
- Department heads are notified for prompt action.

### 10. **Department Action**
- Departments take necessary steps to resolve complaints efficiently.
- Updates are recorded in the system for transparency.

### 11. **Record Action & Close Ticket**
- Once resolved, tickets are marked as closed.
- Users are notified about the resolution via email or SMS.

---

## Legal Assistance Feature

### Lawyer Connection
NyayaSetu provides an option for users to connect with legal professionals:
- Users can seek advice from lawyers regarding their queries or disputes.
- The platform offers recommendations based on user needs and case requirements.
- Provides access to Pro Bono advocates under government initiatives like Nyaya Bandhu.

---

## Administrative Features

### Admin Portal
The admin portal offers tools for managing complaints efficiently:
1. View department-wise complaints for better oversight.
2. Track frequent offenders or recurring issues through timelines.
3. Generate monthly reports summarizing complaint statistics and resolutions.

---

### Export Monthly Reports
Administrators can export detailed reports in PDF format:
1. Summarizes complaint data by category and resolution status.
2. Provides insights into system performance and user engagement.

---

## Support System

### Chatbot Assistance
NyayaSetu includes an AI-powered RAG chatbot that provides:
1. Navigation help for users unfamiliar with the interface.
2. Quick answers to common questions about government services or complaint submission processes.
3. Connection to live support agents for complex queries requiring human intervention.

![image](https://github.com/user-attachments/assets/fd5901de-8c2a-4664-8eea-5e6487a4ffe3)


---

## User Flow Summary 

1. Users authenticate via OTP/email registration or continue as guests with limited functionality.
2. From the Home Dashboard, users select "Raise Complaint" or explore legal assistance options.
3. Complaints are categorized based on government services and submitted with relevant details.
4. Verified complaints are stored in the system and converted into tickets for tracking.
5. Tickets are routed to appropriate departments, where actions are taken, tracked, and resolved.
6. Administrators use advanced tools like department-wise views, offender timelines, and reporting features for oversight and system improvement.


![image](https://github.com/user-attachments/assets/06db2100-fa48-4e6a-b740-4a6fd5ddfc41)




---

## Accessibility & Deployment

NyayaSetu is designed to be accessible across devices (smartphones, tablets, desktops) ensuring inclusivity for all users. It leverages modern technologies.

