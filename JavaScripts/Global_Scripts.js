function ToFizzBuzz(Number) {

	if ( (Number%3==0) && (Number%5==0 ) ) {
		return('FizzBuzz');
	}
	else if ( (Number%3) == 0) {
		return('Fizz');
	}
	else if ( (Number%5) == 0) {
		return('Buzz');
	}
	else { return(Number)}
}
