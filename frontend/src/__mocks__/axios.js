const mockResponse={
    data:[
        {
            user_id: '2dd44737-ca2c-4d1f-b5a6-61f909e44d59', 
            name: 'testroot', 
            email: 'testroot@studentgov.sutd.edu.sg', 
            user_type: 'ROOT'}
        ]
}

export default{
    get: jest.fn().mockResolvedValue(mockResponse)
}