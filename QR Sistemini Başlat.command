#!/bin/zsh

cd "$(dirname "$0")" || exit 1

if ! command -v npm >/dev/null 2>&1; then
  echo "Node.js bulunamadı. Önce https://nodejs.org adresinden Node.js kurun."
  read -r "?Kapatmak için Enter'a basın..."
  exit 1
fi

echo "QR Sistemi hazırlanıyor..."
npm run dev -- --host localhost --port 4173 &
qr_server_pid=$!

cleanup() {
  kill "$qr_server_pid" >/dev/null 2>&1
}
trap cleanup EXIT INT TERM

for attempt in {1..40}; do
  if curl -fsS http://localhost:4173/ >/dev/null 2>&1; then
    open http://localhost:4173/
    break
  fi
  sleep 0.25
done

echo "QR Sistemi açık. Durdurmak için bu pencereyi kapatın veya Ctrl+C'ye basın."
wait "$qr_server_pid"
