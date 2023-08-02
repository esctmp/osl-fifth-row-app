const mockResponse={
    CognitoUser:{
        signInUserSession:{
            accessToken:{
                payload:{
                    "cognito:groups":['ROOT']
                }
            }
        }
    }
}
export default{
    signIn:jest.fn().mockResolvedValue(mockResponse)
}