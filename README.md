# Paste

This is a Cloudflare Worker that allows you to create and fetch pastes.

## Create a paste

```bash
# Create a paste
sudo dmesg | curl -d @- https://paste-url.worker.dev/your-username

# Create a paste with a custom url
sudo dmesg | curl -d @- https://paste-url.worker.dev/your-username/dmesg-20250706
```

## Fetch a paste

```bash
curl https://paste-url.worker.dev/your-username/dmesg-today
```

## Delete a paste

TBD
