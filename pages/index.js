import React from 'react'
import Router from 'next/router'
import Drawer from '../components/drawer'
import {getCookie} from '../lib/cookie'
import * as action from '../redux/actionIndex'


function Index() {
  return (
    <div>
      <Drawer>

      </Drawer>
    </div>
  )
}

Index.getInitialProps = async (ctx) => {
  if(ctx.res){
    ctx.res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  }
  if(ctx && !process.browser) {
      if(ctx.req.headers.cookie) {
        ctx.store.dispatch(action.reauthenticate(getCookie('token', ctx.req),getCookie('idusers', ctx.req)))
      }
  }

  const token = ctx.store.getState().token;
  // set gettoken to false if no token in cookies
  if(!token && token !== undefined && ctx.pathname === '/'){
      if(process.browser){
          Router.push('/login')
      } else {

      }
  }

  return {  }
}

export default Index

