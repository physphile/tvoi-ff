services=("auth" "marketing" "timetable" "services" "print" "social" "converter" "userdata" "achievement" "rating")

for service in "${services[@]}"; do
  bunx openapi-ts --input "https://api.test.profcomff.com/${service}/openapi.json" --output "src/shared/api/${service}" --plugins "@hey-api/client-fetch" --plugins "@tanstack/react-query"
done
