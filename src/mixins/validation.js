export default {
    methods: {
        validateString(value, minLength, maxLength) {
            if(typeof value === 'string') {
                 if(minLength <= value.length && value.length <= maxLength ) {
                    console.log(value.length)
                    return { success: true, message: 'Its a valid string'}
                 } else {
                    return {
                        success: false,
                        message: value.length > maxLength ?  'Field is to long': 'Field is to short' 
                    }
                 }
            }
            return {
                success: false,
                message: 'Please input a string'
            };
        }
    }
}