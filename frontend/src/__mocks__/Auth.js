const mockResponse={
    signInUserSession:{
        accessToken:{
            payload:{
                "cognito:groups":'FRE'                
            }
        }
    }
}
export default{
    signIn:jest.fn().mockResolvedValue(mockResponse)
}