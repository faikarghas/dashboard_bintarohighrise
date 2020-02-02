import React, {useEffect,useState} from 'react'
import fetch from 'isomorphic-unfetch';
import Router from 'next/router'
import Drawer from '../components/drawer'
import TableList from '../components/tableLeads'
import {getCookie} from '../lib/cookie'
import * as action from '../redux/actionIndex'

function Leads() {
    const [dataLeads,setDataLeads] = useState([])
    useEffect(() => {
        fetch('https://api.bintarojayahighrise.com/api/getform')
        .then( r => r.json() )
        .then( data => {
            setDataLeads(data)
            console.log(data);
        });
      }, [])
    return (
        <div>
            <Drawer>
                <TableList data={dataLeads}/>
            </Drawer>
        </div>
    )
}

Leads.getInitialProps = async (ctx) => {
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
    if(!token && token !== undefined && ctx.pathname === '/leads'){
        if(process.browser){
            Router.push('/login')
        } else {

        }
    }

    return {  }
  }


export default Leads
