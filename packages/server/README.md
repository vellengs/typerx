## 快速开始  

1. 准备.env环境配置文件，并修改为正确的配置值  
`
\cp -rpf example.env .env
`

2. 准备初始化数据  

```
mkdir -p ./data/
cat > ./data/export.accounts.json << EOF
[
    {
        "_id": "5a3bd5fd653066a89ebec993",
        "username": "admin",
        "password": "$2a$10$cnf4ELqkrVEyY270mCtpNe9h.KaHax0hFCv1N0gj/FlSHZEKq8aIG",
        "groups": [
        ],
        "roles": [  
        ],
        "mobile": "13333333333",
        "isDisable": false,
        "isAdmin": true,
        "isApproved": true
    } 
]
EOF
```

3. 导入初始化数据   
`
ts-node src/scripts/data.import.ts
`

4. 启动  
```
npm i
npm start
```

## FAQ:  

Q: 默认用户名密码是什么?   
A: 用户名admin 密码 111111  

Q: 找不到命令ts-node  
A: 执行 `npm i -g ts-node` 全局安装 ts-node npm模块  

Q: 出现 `[0] [nodemon] app crashed - waiting for file changes before starting... `   
A: 请检查 .env 文件里配置项是否正确， 查看.log/error.log 文件里具体错误。  



