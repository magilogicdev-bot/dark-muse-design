# Настройка Figma MCP Server (Remote)

## Шаги для настройки в Cursor

Конфигурация MCP хранится в настройках Cursor (не в проекте). Следуйте инструкциям ниже.

### 1. Откройте настройки MCP в Cursor

Есть несколько способов:

**Способ 1: Через deep link**
- Кликните на эту ссылку: [Figma MCP Server Configuration](https://cursor.sh/mcp/figma)
- Это откроет настройки MCP в Cursor

**Способ 2: Через Command Palette**
- Нажмите `Ctrl+Shift+P` (или `Cmd+Shift+P` на Mac)
- Введите: `MCP: Open User Configuration` или `MCP: Open Workspace Folder MCP Configuration`

### 2. Установка сервера

1. В открывшемся окне найдите "Figma" в списке MCP серверов
2. Нажмите **"Install"** под 'Install MCP Server?'
3. Убедитесь, что конфигурация содержит:
   ```json
   {
     "inputs": [],
     "servers": {
       "figma": {
         "url": "https://mcp.figma.com/mcp",
         "type": "http"
       }
     }
   }
   ```

### 2.1. Настройка Figma API Token (опционально)

Для использования Figma API в скриптах проекта токен настраивается в `~/.cursor/mcp.json`:

```json
{
  "servers": {
    "figma-api": {
      "command": "npx",
      "args": [
        "-y",
        "figma-developer-mcp",
        "--figma-api-key=YOUR_TOKEN",
        "--stdio"
      ]
    }
  }
}
```

Токен автоматически читается скриптами из `mcp.json`:
- `scripts/download-figma-icons-api.ps1`
- `scripts/download-news-images.ps1`
- `scripts/download-bank-logos.cjs`
- И других скриптах, использующих Figma API

**Примечание:** MCP сервер Figma использует OAuth для аутентификации, поэтому токен API используется только для скриптов проекта, а не для самого MCP сервера.

### 3. Подключение и аутентификация

1. Нажмите **"Connect"** рядом с Figma
2. Нажмите **"Open"** в диалоговом окне
3. В браузере нажмите **"Allow Access"** для авторизации
4. Вернитесь в Cursor - должно появиться сообщение об успешной аутентификации

### 4. Проверка подключения

После настройки вы сможете использовать MCP инструменты Figma:

- `get_screenshot` - получить скриншот узла
- `get_design_context` - получить контекст дизайна и код
- `get_metadata` - получить метаданные узла
- `get_variable_defs` - получить определения переменных
- И другие инструменты

## Использование

После настройки вы можете использовать Figma ссылки напрямую:

```
Реализуй дизайн из Figma: https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1054-4896&m=dev
```

MCP сервер автоматически извлечет `fileKey` и `nodeId` из URL и загрузит данные из Figma.

## Преимущества Remote Server

- ✅ Не требует установки Figma Desktop App
- ✅ Работает из любого места
- ✅ Доступ к файлам через OAuth
- ✅ Поддержка Code Connect
- ✅ Доступ к Make ресурсам

## Troubleshooting

Если возникают проблемы:

1. **Сервер не подключается:**
   - Проверьте интернет-соединение
   - Убедитесь, что URL правильный: `https://mcp.figma.com/mcp`

2. **Ошибка аутентификации:**
   - Попробуйте отключить и подключить сервер заново
   - Проверьте, что у вас есть доступ к Figma файлу

3. **Инструменты не загружаются:**
   - Перезапустите Cursor
   - Проверьте логи MCP в настройках

## Дополнительная информация

- [Документация Figma MCP Server](https://www.figma.com/developers/mcp)
- [Model Context Protocol](https://modelcontextprotocol.io/)
