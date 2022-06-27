import { View, Text } from 'react-native'
import React from 'react'
import PushNotification from 'react-native-push-notification'

const Localnotification = (props) => {
    const date= props?.route?.params?.data;
    useEffect(() => {
        console.log("date-->",date)
      PushNotification.configure({
        onRegister: (token)=>
        {
console.log("token -->",token);
        },
        onNotification: (notification)=>
        {
            console.log('Notification -->', notification)

        },
        popInitialNotification:true,
        requestPermissions:false
      });
      PushNotification.createChannel(
        {
            channelId:'reminders',
            channelName :'Task reminders notifications',
            channelDescription:'Reminders for any tasks',
        }

      );
      PushNotification.getScheduledLocalNotifications(rn=>{
        console.log('SN --->',rn);
      }
      
      
      )
      console.log('channel created ', )
    
    
    }, [])
    
    const sheduleNotification=()=>
    {
        PushNotification.localNotificationSchedule(
            {
                channelId:'reminders',
                title:'New Task Added',
                message:'You have added new task',
                date:date
            }
        )
    }
  return (
       sheduleNotification()
    
  )
}

export  default Localnotification;