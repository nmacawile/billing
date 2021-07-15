module RequestSpecHelper
  def json
    JSON.parse(response.body)
  end

  def json_id
    json['_id']['$oid']
  end

  def json_ids
    json.map { |j| j['_id']['$oid'] }
  end
end
