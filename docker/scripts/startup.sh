#!/bin/bash
## startup wrapper scrip
PROJECT_DIR=/usr/share/nginx/html
CONFIG_FILE=$(find ${PROJECT_DIR} -type f -name 'settings.production.json')

cat ${CONFIG_FILE} |\
    jq '.restBaseUrl = "'${REST_BASE_URL}'"' |\
    jq '.restBaseUrl = "'${REST_BASE_URL}'"' >> ${CONFIG_FILE}.tmp && mv ${CONFIG_FILE}.tmp ${CONFIG_FILE}

sed -i -e 's|<base href="/"|<base href="'${UI_BASE_HREF}'"|g' /usr/share/nginx/html/index.html
# sed -i -e 's|<script src="/assets/browser-check.js"></script>|<script src="'${UI_BASE_HREF}'assets/browser-check.js"></script>|g' /usr/share/nginx/html/index.html


# CSS adjustments (relative paths to assets)
cd /usr/share/nginx/html/
for i in *.js; do # Whitespace-safe but not recursive.
    echo "replacing base href in $i"
    /bin/sed -i 's|:url(/assets/|:url('${UI_BASE_HREF}'assets/|g' "$i"
done
for i in *.css; do # Whitespace-safe but not recursive.
    echo "replacing base href in $i"
    /bin/sed -i 's|:url(/assets/|:url('${UI_BASE_HREF}'assets/|g' "$i"
done
cd -

nginx -g 'daemon off;'