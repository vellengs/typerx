# language: zh-CN
      @user_login
      功能: 用户登录功能 

      用户名和密码登录：
      1.错误的用户名和密码登录的情况
      2.正确的用户名和密码的情况

      场景大纲: 用户名密码登录
      假如导航到用户登录页面
      当用户名输入"<username>"
      当密码输入"<password>"
      当点击登录按钮
      那么应该登录"<status>"，校验点为"<checkpoint>"
      例子:
      | username | password | status | checkpoint |
      | admin    | 888888   | 成功     | true       |
      |          | 123456   | 失败     | 信息不完整。     |
      | admin1   | 123456   | 失败     | 用户名或密码错误   |