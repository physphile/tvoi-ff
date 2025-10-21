services=("auth" "marketing" "timetable" "services" "print" "converter" "userdata" "achievement" "rating" "dating" "rental")

for service in "${services[@]}"; do
  echo "Generating API for service: $service"
  bunx openapi-ts --input "https://api.test.profcomff.com/${service}/openapi.json" --output "src/shared/api/${service}" --plugins "@hey-api/client-fetch" --plugins "@tanstack/react-query"
  
  if [ $? -eq 0 ]; then
    echo "API for service $service generated successfully"
    echo "Updating baseUrl in client.gen.ts for service: $service"
    sed -i "s|baseUrl: '/$service'|baseUrl: 'https://api.test.profcomff.com/$service'|g" "src/shared/api/${service}/client.gen.ts"
  else
    echo "Failed to generate API for service: $service"
  fi
done
