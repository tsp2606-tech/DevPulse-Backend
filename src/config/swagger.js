import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'DevPulse API Documentation',
      version: '1.0.0',
      description: 'Tài liệu API cho DevPulse Backend - Ứng dụng lưu trữ và quản lý tài nguyên.',
      contact: {
        name: 'DevPulse Team'
      }
    },
    servers: [
      {
        url: "/",
        description: 'Local server'
      }
    ],
    components: {
      schemas: {
        Resource: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Mã định danh tự động của MongoDB'
            },
            title: {
              type: 'string',
              description: 'Tiêu đề tài nguyên'
            },
            url: {
              type: 'string',
              description: 'Đường dẫn liên kết URL'
            },
            category: {
              type: 'string',
              enum: ['Frontend', 'Backend', 'DevOps', 'AI', 'Mobile', 'UI/UX'],
              description: 'Phân loại danh mục'
            },
            tags: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Danh sách các thẻ tag'
            },
            summary: {
              type: 'string',
              description: 'Mô tả ngắn gọn về tài nguyên'
            },
            upvotes: {
              type: 'integer',
              description: 'Số lượt bình chọn'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        ResourceInput: {
          type: 'object',
          required: ['title', 'url', 'category', 'tags'],
          properties: {
            title: {
              type: 'string',
              description: 'Tiêu đề tài nguyên (3 - 100 ký tự)'
            },
            url: {
              type: 'string',
              description: 'Đường dẫn liên kết hợp lệ'
            },
            category: {
              type: 'string',
              enum: ['Frontend', 'Backend', 'DevOps', 'AI', 'Mobile', 'UI/UX'],
              description: 'Danh mục tài nguyên'
            },
            tags: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Mảng các thẻ (Tối đa 5 thẻ, mỗi thẻ tối đa 20 ký tự)'
            },
            summary: {
              type: 'string',
              description: 'Mô tả (tối đa 300 ký tự)'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string'
            },
            error: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  // Đường dẫn trỏ tới nơi chứa các comment API
  apis: ['./src/routes/*.js']
};

export const swaggerSpecs = swaggerJsDoc(swaggerOptions);
