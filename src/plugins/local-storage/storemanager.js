// Exports Petstore.yaml

export default `swagger: "2.0"
info:
  description: "库存管理系统接口文档"
  version: "1.0.0"
  title: "Stores Manager"
  termsOfService: "http://service.sosochina.com"
  contact:
    email: "1005827483@qq.com"
  license:
    name: "Apache 2.0"
    url: "http://www.apache.org/licenses/LICENSE-2.0.html"
host: "www.sosochina.com"
basePath: "/v1"
tags:
- name: "user"
  description: "用户基本操作"
- name: "store"
  description: "店铺基本操作"
- name: "store_customer"
  description: "店铺的客户信息操作"
- name: "store_employee"
  description: "店铺的员工信息操作"
- name: "store_supplier"
  description: "店铺的供货商信息操作"
- name: "store_repository"
  description: "店铺的仓库信息操作"
- name: "store_product"
  description: "商品相关信息操作"
schemes:
- "http"
paths:
  /user/register:
    post:
      tags:
      - "user"
      summary: "创建用户"
      description: "用户注册"
      operationId: "createUser"
      produces:
      - "application/json"
      parameters:
      - in: "body"
        name: "body"
        description: "创建的用户对象"
        required: true
        schema:
          $ref: "#/definitions/User"
      responses:
        default:
          schema:
            $ref: "#/definitions/defaultResponse"
          description: "操作结果"
  /user/checkusername:
    post:
      tags:
      - "user"
      summary: "检查用户名是否存在"
      description: "检查用户名是否存在"
      operationId: "checkusername"
      produces:
      - "application/json"
      parameters: 
      - in: "body"
        name: "body"
        description: "准备注册的用户名"
        required: true
        schema:
          $ref: "#/definitions/checkUsername"
      responses:
        default:
          schema:
            $ref: "#/definitions/defaultResponse"
          description: "操作结果"
  /user/login:
    post:
      tags:
      - "user"
      summary: "用户登录"
      description: ""
      operationId: "loginUser"
      produces:
      - "application/json"
      parameters:
      - in: "body"
        name: "body"
        description: "登录的用户名，密码"
        required: true
        schema:
          $ref: "#/definitions/loginInfo"
      responses:
        default:
          schema:
            $ref: "#/definitions/loginResponse"
          description: "操作结果"
  /user/logout:
    get:
      tags:
      - "user"
      summary: "注销登录"
      description: ""
      operationId: "logoutUser"
      produces:
      - "application/json"
      parameters: []
      responses:
        default:
          description: "注销成功"
  /user/{userid}:
    get:
      tags:
      - "user"
      summary: "通过用户名获取用户信息"
      description: ""
      operationId: "getUserById"
      produces:
      - "application/json"
      parameters:
      - name: "userid"
        in: "path"
        description: "查询的用户ID"
        required: true
        type: "string"
      responses:
        200:
          description: "操作成功"
          schema:
            $ref: "#/definitions/User"
        400:
          description: "提供的用户ID无效"
        404:
          description: "没有找到该用户"
    put:
      tags:
      - "user"
      summary: "更新用户信息"
      description: "只有用户登录后才能进行操作"
      operationId: "updateUserById"
      produces:
      - "application/json"
      parameters:
      - name: "userid"
        in: "path"
        description: "需要更新的用户ID"
        required: true
        type: "string"
      - in: "body"
        name: "body"
        description: "更新用户对象"
        required: true
        schema:
          $ref: "#/definitions/User"
      responses:
        400:
          description: "给定的用户名无效"
        404:
          description: "没有找到该用户"
    delete:
      tags:
      - "user"
      summary: "删除用户"
      description: "只有用户登录后才允许删除。"
      operationId: "deleteUserById"
      produces:
      - "application/json"
      parameters:
      - name: "userid"
        in: "path"
        description: "需要删除的用户ID"
        required: true
        type: "string"
      responses:
        400:
          description: "提供的用户ID无效"
        404:
          description: "没有找到该用户"
      deprecated: true
  /store/create:
    post:
      tags:
      - "store"
      summary: "创建店铺"
      description: "创建一个需要进行库存管理的店铺"
      operationId: "createStore"
      produces:
      - "application/json"
      parameters:
      - in: "body"
        name: "body"
        description: "创建的店铺对象"
        required: true
        schema:
          $ref: "#/definitions/CreateStore"
      responses:
        default:
          description: "操作成功"
  /store/getAll:
    get:
      tags:
      - "store"
      summary: "获取店铺列表"
      description: "获取店铺列表"
      operationId: "getStores"
      produces:
      - "application/json"
      responses:
        200:
          description: "操作成功"
          schema:
            type: "array"
            items:
              $ref: "#/definitions/ResponseStore"
        400:
          description: "操作无效"
  /store/{storeId}:
    get:
      tags:
      - "store"
      summary: "通过店铺ID获取店铺信息"
      description: "通过店铺ID获取店铺信息"
      operationId: "getStoreById"
      produces:
      - "application/json"
      parameters:
      - name: "storeId"
        in: "path"
        description: "需要查询的店铺ID"
        required: true
        type: "integer"
        format: "int64"
      responses:
        200:
          description: "操作成功"
          schema:
            $ref: "#/definitions/ResponseStore"
        400:
          description: "提供的店铺ID无效"
        404:
          description: "没有找到该店铺"
    put:
      tags:
      - "store"
      summary: "更新店铺信息"
      description: "只有创建该店铺的用户才有权更新该店铺"
      operationId: "updateStore"
      produces:
      - "application/json"
      parameters:
      - name: 'storeId'
        in: "path"
        description: "需要更新的店铺ID"
        required: true
        type: "string"
      - in: "body"
        name: "body"
        description: "更新的店铺对象"
        required: true
        schema:
         $ref: "#/definitions/ResponseStore"
      responses:
        400:
          description: "提供的店铺ID无效"
        404:
          description: "没有找到该店铺"
    delete:
      tags:
      - "store"
      summary: "删除店铺"
      description:
        "只有创建该店铺的用户才有权删除该店铺"
      operationId: "deleteStore"
      produces:
      - "application/json"
      parameters:
      - name: "storeId"
        in: "path"
        description: "需要删除的店铺ID"
        required: true
        type: "string"
      responses:
        400:
          description: "提供的店铺ID无效"
        404:
          description: "没有找到该店铺"
  /store/{storeId}/customer/create:
    post:
      tags:
      - "store_customer"
      summary: "新建客户"
      description: "新建客户"
      operationId: "createStoreCustomer"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "body"
        name: "body"
        description: "创建的客户对象"
        required: true
        schema:
          $ref: "#/definitions/CreateStoreCustomer"
      responses:
        default:
          description: "操作成功"
  /store/{storeId}/customer/getAll:
    get:
      tags:
      - "store_customer"
      summary: "获取客户列表"
      description: "获取客户列表"
      operationId: "getStoreCustomers"
      produces:
      - "application/json"
      parameters: 
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      responses:
        200:
          description: "操作成功"
          schema:
            type: "array"
            items:
              $ref: "#/definitions/ResponseStoreCustomer"
        400:
          description: "操作无效"
  /store/{storeId}/customer/{customerId}:
    get:
      tags:
      - "store_customer"
      summary: "根据客户ID获取信息"
      description: "返回客户信息"
      operationId: "getStoreCustomerById"
      produces:
      - "application/json"
      parameters:
      - name: "storeId"
        in: "path"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - name: "customerId"
        in: "path"
        description: "客户ID"
        required: true
        type: "integer"
        format: "int64"
      responses:
        200:
          description: "操作成功"
          schema:
            $ref: "#/definitions/ResponseStoreCustomer"
        400:
          description: "无效的客户ID"
        404:
          description: "没有找到该客户"
    put:
      tags:
      - "store_customer"
      summary: "更新客户信息"
      description: "更新客户信息"
      operationId: "updateStoreCustomerById"
      produces:
      - "application/json"
      parameters:
      - name: "storeId"
        in: "path"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - name: "customerId"
        in: "path"
        description: "客户ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "body"
        name: "body"
        description: "更新的客户对象"
        required: true
        schema:
          $ref: "#/definitions/ResponseStoreCustomer"
      responses:
        400:
          description: "给定的客户ID无效"
        404:
          description: "没有找到该客户"
    delete:
      tags:
      - "store_customer"
      summary: "删除客户信息"
      description: "删除客户信息"
      operationId: "deleteStoreCustomerById"
      produces:
      - "application/json"
      parameters:
      - name: "storeId"
        in: "path"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - name: "customerId"
        in: "path"
        description: "客户ID"
        required: true
        type: "integer"
        format: "int64"
      responses:
        400:
          description: "给定的客户ID无效"
        404:
          description: "没有找到该客户"
  /store/{storeId}/employee/create:
    post:
      tags:
      - "store_employee"
      summary: "新建员工"
      description: "新建员工"
      operationId: "createStoreEmployee"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "body"
        name: "body"
        description: "创建的员工对象"
        required: true
        schema:
          $ref: "#/definitions/CreateStoreEmployee"
      responses:
        default:
          description: "操作成功"
  /store/{storeId}/employee/getAll:
    get:
      tags:
      - "store_employee"
      summary: "获取员工列表"
      description: "获取员工列表"
      operationId: "getStoreEmployees"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      responses:
        200:
          description: "操作成功"
          schema:
            type: "array"
            items:
              $ref: "#/definitions/ResponseStoreEmployee"
        400:
          description: "操作无效"
  /store/{storeId}/employee/{employeeId}:
    get:
      tags:
      - "store_employee"
      summary: "根据员工ID获取信息"
      description: "返回员工信息"
      operationId: "getStoreEmployeeById"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - name: "employeeId"
        in: "path"
        description: "员工ID"
        required: true
        type: "integer"
        format: "int64"
      responses:
        200:
          description: "操作成功"
          schema:
            $ref: "#/definitions/ResponseStoreEmployee"
        400:
          description: "无效的员工ID"
        404:
          description: "没有找到该员工"
    put:
      tags:
      - "store_employee"
      summary: "更新员工信息"
      description: "更新员工信息"
      operationId: "updateStoreEmployeeById"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - name: "employeeId"
        in: "path"
        description: "员工ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "body"
        name: "body"
        description: "更新的员工对象"
        required: true
        schema:
          $ref: "#/definitions/ResponseStoreEmployee"
      responses:
        400:
          description: "给定的员工ID无效"
        404:
          description: "没有找到该员工"
    delete:
      tags:
      - "store_employee"
      summary: "删除员工信息"
      description: "删除员工信息"
      operationId: "deleteStoreEmployeeById"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - name: "employeeId"
        in: "path"
        description: "员工ID"
        required: true
        type: "string"
      responses:
        400:
          description: "给定的员工ID无效"
        404:
          description: "没有找到该员工"
  /store/{storeId}/employee/role/create:
    post:
      tags:
      - "store_employee"
      summary: "创建角色"
      description: "创建角色"
      operationId: "createStoreEmployeeRole"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "body"
        name: "body"
        description: "创建的角色对象"
        required: true
        schema:
          $ref: "#/definitions/CreateStoreEmployeeRole"
      responses:
        default:
          description: "操作成功"
  /store/{storeId}/employee/role/getAll:
    get:
      tags:
      - "store_employee"
      summary: "获取角色列表"
      description: "获取角色列表"
      operationId: "getStoreEmployeeRoles"
      produces:
      - "application/json"
      parameters: 
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      responses:
        200:
          description: "操作成功"
          schema:
            type: "array"
            items:
              $ref: "#/definitions/ResponseStoreEmployeeRole"
        400:
          description: "操作无效"
  /store/{storeId}/employee/role/{roleId}:
    put:
      tags:
      - "store_employee"
      summary: "修改指定角色信息"
      description: "修改指定ID的角色信息"
      operationId: "updateStoreEmployeeRoleById"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - name: "roleId"
        in: "path"
        description: "角色ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "body"
        name: "body"
        description: "更新的角色对象"
        required: true
        schema:
          $ref: "#definitions/ResponseStoreEmployeeRole"
      responses:
        400:
          description: "给定的角色ID无效"
        404:
          description: "没有找到该角色"
    delete:
      tags:
      - "store_employee"
      summary: "删除指定角色"
      description: "删除指定角色"
      operationId: "deleteStoreEmployeeRoleById"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - name: "roleId"
        in: "path"
        description: "角色ID"
        required: true
        type: "string"
      responses:
        400:
          description: "给定的角色ID无效"
        404:
          description: "没有找到该角色"
  /store/{storeId}/supplier/create:
    post:
      tags:
      - "store_supplier"
      summary: "创建供应商"
      description: "创建供应商"
      operationId: "createStoreSupplier"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "body"
        name: "body"
        description: "创建的供应商对象"
        required: true
        schema:
          $ref: "#/definitions/CreateStoreSupplier"
      responses:
        default:
          description: "操作成功"
  /store/{storeId}/supplier/getAll:
    get:
      tags:
      - "store_supplier"
      summary: "获取所有供应商"
      description: "获取所有供应商"
      operationId: "getStoreSuppliers"
      produces:
      - "application/json"
      parameters: 
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      responses:
        200:
          description: "操作成功"
          schema:
            type: "array"
            items:
              $ref: "#/definitions/ResponseStoreSupplier"
        400:
          description: "操作无效"
  /store/{storeId}/supplier/{supplierId}:
    get:
      tags:
      - "store_supplier"
      summary: "查询指定供应商信息"
      description: "查询指定供应商信息"
      operationId: "getStoreSupplierById"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "path"
        name: "supplierId"
        description: "供应商ID"
        required: true
        type: "integer"
        format: "int64"
      responses:
        200:
          description: "操作成功"
          schema:
            $ref: "#/definitions/ResponseStoreSupplier"
        400:
          description: "无效的供应商ID"
        404:
          description: "没有找到该供应商"
    put:
      tags:
      - "store_supplier"
      summary: "更新指定供应商信息"
      description: "更新指定供应商信息"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "path"
        name: "supplierId"
        description: "供应商ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "body"
        name: "body"
        description: "更新的供应商对象"
        required: true
        schema:
          $ref: "#/definitions/ResponseStoreSupplier"
      responses:
        400:
          description: "给定的供应商ID无效"
        404:
          description: "没有找到该供应商"
    delete:
      tags:
      - "store_supplier"
      summary: "删除指定供应商"
      description: "删除指定供应商"
      operationId: "deleteStoreSupplierById"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "path"
        name: "supplierId"
        description: "供应商ID"
        required: true
        type: "integer"
        format: "int64"
      responses:
        400:
          description: "给定的供应商ID无效"
        404:
          description: "没有找到该供应商"
  /store/{storeId}/repository/create:
    post:
      tags:
      - "store_repository"
      summary: "创建仓库"
      description: "创建仓库"
      operationId: "createStoreRepository"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "body"
        name: "body"
        description: "创建的仓库对象"
        required: true
        schema:
          $ref: "#/definitions/CreateStoreRepository"
      responses:
        default:
          description: "操作成功"
  /store/{storeId}/respository/getAll:
    get:
      tags:
      - "store_repository"
      summary: "获取所有仓库"
      description: "获取所有仓库"
      operationId: "getStoreRepositorys"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      responses:
        200:
          description: "操作成功"
          schema:
            type: "array"
            items:
              $ref: "#/definitions/ResponseStoreRepository"
        400:
          description: "操作无效"
  /store/{storeId}/repository/{repositoryId}:
    get:
      tags:
      - "store_repository"
      summary: "查询指定仓库信息"
      description: "查询指定仓库信息"
      operationId: "getStoreRepositoryById"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "path"
        name: "repositoryId"
        description: "仓库ID"
        required: true
        type: "integer"
        format: "int64"
      responses:
        200:
          description: "操作成功"
          schema:
            $ref: "#/definitions/ResponseStoreRepository"
        400:
          description: "无效的仓库ID"
        404:
          description: "没有找到该仓库"
    put:
      tags:
      - "store_repository"
      summary: "更新指定仓库信息"
      description: "更新指定仓库信息"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "path"
        name: "repositoryId"
        description: "仓库ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "body"
        name: "body"
        description: "更新的仓库对象"
        required: true
        schema:
          $ref: "#/definitions/ResponseStoreRepository"
      responses:
        400:
          description: "给定的仓库ID无效"
        404:
          description: "没有找到该仓库"
    delete:
      tags:
      - "store_repository"
      summary: "删除指定仓库"
      description: "删除指定仓库"
      operationId: "deleteStoreRepositoryById"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "path"
        name: "repositoryId"
        description: "仓库ID"
        required: true
        type: "integer"
        format: "int64"
      responses:
        400:
          description: "给定的仓库ID无效"
        404:
          description: "没有找到该仓库"
  /store/{storeId}/product/create:
    post:
      tags:
      - "store_product"
      summary: "创建商品"
      description: "创建商品"
      operationId: "createStoreProduct"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "body"
        name: "body"
        description: "创建的商品对象"
        required: true
        schema:
          $ref: "#/definitions/CreateProduct"
      responses:
        default:
          description: "操作成功"
  /store/{storeId}/product/getAll:
    get:
      tags:
      - "store_product"
      summary: "获取所有商品"
      description: "获取该店铺的所有商品"
      operationId: "getStoreProducts"
      produces:
      - "application/json"
      parameters: 
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      responses:
        200:
          description: "操作成功"
          schema:
            type: "array"
            items:
              $ref: "#/definitions/ResponseProduct"
        400:
          description: "操作无效"
  /store/{storeId}/product/{productId}:
    get:
      tags:
      - "store_product"
      summary: "查询指定ID商品"
      description: "查询指定ID商品"
      operationId: "getStoreProductById"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "path"
        name: "productId"
        description: "商品ID"
        required: true
        type: "integer"
        format: "int64"
      responses:
        200:
          description: "操作成功"
          schema:
            $ref: "#/definitions/ResponseProduct"
        400:
          description: "无效的商品ID"
        404:
          description: "未找到该商品"
    put:
      tags:
      - "store_product"
      summary: "更新指定商品信息"
      description: "更新指定ID商品信息"
      operationId: "updateStoreProductById"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "path"
        name: "productId"
        description: "商品ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "body"
        name: "body"
        description: "更新的商品对象"
        required: true
        schema:
          $ref: "#/definitions/ResponseProduct"
      responses:
        400:
          description: "给定的商品ID无效"
        404:
          description: "没有找到该商品"
    delete:
      tags:
      - "store_product"
      summary: "删除指定商品"
      description: "删除指定ID商品"
      operationId: "deleteStoreProductById"
      produces:
      - "application/json"
      parameters:
      - in: "path"
        name: "storeId"
        description: "店铺ID"
        required: true
        type: "integer"
        format: "int64"
      - in: "path"
        name: "productId"
        description: "商品ID"
        required: true
        type: "integer"
        format: "int64"
      responses:
        400:
          description: "给定的商品ID无效"
        404:
          description: "没有找到该商品"      
definitions:
  User:
    type: "object"
    properties:
      username:
        type: "string"
        description: "用户名"
      email:
        type: "string"
        description: "电子邮箱"
      password:
        type: "string"
        description: "密码"
      phone:
        type: "string"
        description: "联系电话"
  CreateStore:
    type: "object"
    properties:
      user_id:
        type: "integer"
        format: "int64"
        description: "创建该店铺的用户id"
      name:
        type: "string"
        description: "店铺名"
      linkman:
        type: "string"
        description: "联系人"
      phone:
        type: "string"
        description: "联系电话"
      address:
        type: "string"
        description: "店铺地址"
  ResponseStore:
    type: "object"
    properties:
      id:
        type: "integer"
        format: "int64"
      user_id:
        type: "integer"
        format: "int64"
        description: "创建该店铺的用户id"
      name:
        type: "string"
        description: "店铺名"
      linkman:
        type: "string"
        description: "联系人"
      phone:
        type: "string"
        description: "联系电话"
      address:
        type: "string"
        description: "店铺地址" 
  CreateStoreCustomer:
    type: "object"
    properties:
      name:
        type: "string"
        description: "客户姓名"
      phone:
        type: "string"
        description: "联系电话"
      address:
        type: "string"
        description: "地址"
      remark:
        type: "string"
        description: "备注信息"
  ResponseStoreCustomer:
    type: "object"
    properties:
      id:
        type: "integer"
        format: "int64"
      store_id:
        type: "integer"
        format: "int64"
        description: "客户所属店铺ID"
      name:
        type: "string"
        description: "客户姓名"
      phone:
        type: "string"
        description: "联系电话"
      address:
        type: "string"
        description: "地址"
      remark:
        type: "string"
        description: "备注信息"
  CreateStoreEmployee:
    type: "object"
    properties:
      name:
        type: "string"
        description: "员工姓名"
      phone:
        type: "string"
        description: "联系电话"
      address:
        type: "string"
        description: "地址"
      remark:
        type: "string"
        description: "备注信息"
  ResponseStoreEmployee:
    type: "object"
    properties:
      id:
        type: "integer"
        format: "int64"
      store_id:
        type: "integer"
        format: "int64"
        description: "员工所属店铺ID"
      name:
        type: "string"
        description: "员工姓名"
      phone:
        type: "string"
        description: "联系电话"
      address:
        type: "string"
        description: "地址"
      remark:
        type: "string"
        description: "备注信息"
  CreateStoreEmployeeRole:
    type: "object"
    properties:
      pid:
        type: "integer"
        format: "int64"
        description: "角色父ID"
      name:
        type: "string"
        description: "角色名称"
      description:
        type: "string"
        description: "角色描述"
  ResponseStoreEmployeeRole:
    type: "object"
    properties:
      id:
        type: "integer"
        format: "int64"
      store_id:
        type: "integer"
        format: "int64"
        description: "角色所属店铺ID"
      pid:
        type: "integer"
        format: "int64"
        description: "角色父ID"
      name:
        type: "string"
        description: "角色名称"
      description:
        type: "string"
        description: "角色描述"
  CreateStoreSupplier:
    type: "object"
    properties:
      name:
        type: "string"
        description: "供应商名称"
      linkman:
        type: "string"
        description: "联系人"
      phone:
        type: "string"
        description: "联系电话"
      address:
        type: "string"
        description: "地址"
  ResponseStoreSupplier:
    type: "object"
    properties:
      id:
        type: "integer"
        format: "int64"
      store_id:
        type: "integer"
        format: "int64"
        description: "供应商所属店铺ID"
      name:
        type: "string"
        description: "供应商名称"
      linkman:
        type: "string"
        description: "联系人"
      phone:
        type: "string"
        description: "联系电话"
      address:
        type: "string"
        description: "地址"
  CreateStoreRepository:
    type: "object"
    properties:
      name:
        type: "string"
        description: "仓库名称"
      linkman:
        type: "string"
        description: "联系人"
      phone:
        type: "string"
        description: "联系电话"
      address:
        type: "string"
        description: "地址"
  ResponseStoreRepository:
    type: "object"
    properties:
      id:
        type: "integer"
        format: "int64"
      store_id:
        type: "integer"
        format: "int64"
        description: "仓库所属店铺ID"
      name:
        type: "string"
        description: "仓库名称"
      linkman:
        type: "string"
        description: "联系人"
      phone:
        type: "string"
        description: "联系电话"
      address:
        type: "string"
        description: "地址"
  CreateProduct:
    type: "object"
    properties:
      supplier_id:
        type: "integer"
        format: "int64"
        description: "商品供应商ID"
      repository_id:
        type: "integer"
        format: "int64"
        description: "商品所属仓库ID"
      technic_id:
        type: "integer"
        format: "int64"
        description: "商品工艺ID"
      pattern_id:
        type: "integer"
        format: "int64"
        description: "商品图案ID"
      shape_id:
        type: "integer"
        format: "int64"
        description: "商品器形ID"
      type_id:
        type: "integer"
        format: "int64"
        description: "商品类型ID"
      brand_id:
        type: "integer"
        format: "int64"
        description: "商品品牌ID"
      itemcode:
        type: "string"
        description: "商品编号"
      name:
        type: "string"
        description: "商品名"
      purchase_price:
        type: "integer"
        format: "int64"
        description: "商品进货价/成本"
      selling_price:
        type: "integer"
        format: "int64"
        description: "商品售价"
      additional_cost:
        type: "integer"
        format: "int64"
        description: "额外费用/包装费"
      current_amount:
        type: "integer"
        format: "int64"
        description: "商品当前库存"
      alert_amount:
        type: "integer"
        format: "int64"
        description: "商品警戒库存"
      status:
        type: "integer"
        format: "int64"
        description: "商品状态"
      litpic:
        type: "string"
        description: "商品封面图"
      piclist:
        type: "string"
        description: "商品图片列表"
      addtime:
        type: "integer"
        format: "int64"
        description: "商品添加时间"
      modtime:
        type: "integer"
        format: "int64"
        description: "商品修改时间"
  ResponseProduct:
    type: "object"
    properties:
      id:
        type: "integer"
        format: "int64"
      store_id:
        type: "integer"
        format: "int64"
        description: "商品所属店铺ID"
      supplier_id:
        type: "integer"
        format: "int64"
        description: "商品供应商ID"
      repository_id:
        type: "integer"
        format: "int64"
        description: "商品所属仓库ID"
      technic_id:
        type: "integer"
        format: "int64"
        description: "商品工艺ID"
      pattern_id:
        type: "integer"
        format: "int64"
        description: "商品图案ID"
      shape_id:
        type: "integer"
        format: "int64"
        description: "商品器形ID"
      type_id:
        type: "integer"
        format: "int64"
        description: "商品类型ID"
      brand_id:
        type: "integer"
        format: "int64"
        description: "商品品牌ID"
      itemcode:
        type: "string"
        description: "商品编号"
      name:
        type: "string"
        description: "商品名"
      purchase_price:
        type: "integer"
        format: "int64"
        description: "商品进货价/成本"
      selling_price:
        type: "integer"
        format: "int64"
        description: "商品售价"
      additional_cost:
        type: "integer"
        format: "int64"
        description: "额外费用/包装费"
      current_amount:
        type: "integer"
        format: "int64"
        description: "商品当前库存"
      alert_amount:
        type: "integer"
        format: "int64"
        description: "商品警戒库存"
      status:
        type: "integer"
        format: "int64"
        description: "商品状态"
      litpic:
        type: "string"
        description: "商品封面图"
      piclist:
        type: "string"
        description: "商品图片列表"
      addtime:
        type: "integer"
        format: "int64"
        description: "商品添加时间"
      modtime:
        type: "integer"
        format: "int64"
        description: "商品修改时间"
  checkUsername:
    type: "object"
    properties:
      name:
        type: "string"
        description: "准备注册的用户名"
  loginInfo:
    type: "object"
    properties:
      name:
        type: "string"
        description: "用户名"
      password:
        type: "string"
        description: "密码"
  loginResponse:
    type: "object"
    properties:
      result:
        type: "boolean"
        description: "登录成功还是失败"
      id:
        type: "integer"
        format: "int64"
        description: "登录成功，返回用户ID"
      accessToken:
        type: "string"
        description: "加密生成的用户token"
      name:
        type: "string"
        description: "用户名"
      message:
        type: "string"
        description: "服务器返回的提示信息"
  defaultResponse:
    type: "object"
    properties:
      result:
        type: "boolean"
        description: "操作结果，true表示成功，false表示失败"
      message:
        type: "string"
        description: "操作结果提示信息"
        

`
