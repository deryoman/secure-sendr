#!/usr/bin/env bash
set -euo pipefail

npx prisma migrate deploy
npx prisma generate
exec node server.js