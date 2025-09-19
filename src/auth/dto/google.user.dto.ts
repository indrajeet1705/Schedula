export  class UserGoogleDto{
  name:string
  email:string
  data:string
  verificationMethod:'email'| 'google'
  isVerified:boolean
  
}