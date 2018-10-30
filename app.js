const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('jsonwebtoken');
const index = require('./routes/index')
const users = require('./routes/users')
const book = require('./routes/book')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
		if(ctx.request.header.tokenid){
				let decoded = jwt.decode(ctx.request.header.tokenid,'dxy');
				if(decoded.exp <= new Date()/1000){
						ctx.status = 401;
						ctx.body = {
              message: '没有token'
            }
				}else{
					next();
				}
				
		}else{
			 ctx.status = 401;
			 ctx.body = {
            message: '没有token'
        }
		}
	
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(book.routes(), book.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
