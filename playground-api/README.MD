# The Playground API

## Endpoints

### Get settings for user

Method: Get
Url: /api/settings?userId=targetId


### Save settings for user

Method: POST
Url: /api/settings
Body:
  userId: string
  clientId: string
  secret: string