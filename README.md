# Paste

This is a Cloudflare Worker that allows you to create and fetch pastes.

## Create a paste

```bash
# Create a paste
sudo dmesg | curl -d @- https://paste-url.worker.dev/public

# Create a paste with a custom url
sudo dmesg | curl -d @- https://paste-url.worker.dev/public/dmesg-20250706
```

## Fetch a paste

```bash
curl https://paste-url.worker.dev/public/dmesg-20250706
```

## Delete a paste

TBD
