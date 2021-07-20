module AuthSpecHelper
  def token_generator(user_id)
    JsonWebToken.encode(user_id: user_id)
  end

  def expired_token_generator(user_id)
    JsonWebToken.encode({ user_id: user_id }, 10.seconds.ago)
  end

  def request_headers
    {
      'Content-Type' => 'application/json',
      'Accept' => 'application/json'
    }
  end
  
  def authorized_request_headers(user_id)
    { 
      **self.request_headers,
     'Authorization' => token_generator(user_id)
    }
  end

  def expired_request_headers(user_id)
    { 
      **self.request_headers, 
      'Authorization' => expired_token_generator(user_id)
    }
  end
end
