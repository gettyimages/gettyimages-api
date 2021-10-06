#!/usr/bin/env bash


function assert-credentials {
    # Check for existence of credentials file
    # and write it out if not found
    if [[ ! -f ./credentials.sh ]]
    then
        echo
        echo "******************************************************"
        echo "These examples require a file named credentials.sh"
        echo "The file should have environment variables with"
        echo "your client_id, client_password, username and password"
        echo "set. The file has been created for you, however you"
        echo "must set the values before continuing."
        echo "******************************************************"
        cat > credentials.sh <<EOF
#!/usr/bin/env bash

# These values are required
export CLIENT_ID=''
export CLIENT_SECRET=''

# If you will use resource owner grant, these are required. Otherwise
# they can be left unset
export USERNAME=''
export PASSWORD=''
EOF
        chmod +x ./credentials.sh
        exit
    fi

    # Ensure credential values are set
    source ./credentials.sh
    if [[ -z $CLIENT_ID ]]
    then
        echo 'CLIENT_ID must be set'
        exit
    fi

    if [[ -z $CLIENT_SECRET ]]
    then
        echo 'CLIENT_SECRET must be set'
        exit
    fi
}

function assert-requirements {
    assert-curl
    assert-jq
}

function assert-jq {
    if ! command -v jq &> /dev/null
    then
        echo "This script requires jq: https://stedolan.github.io/jq/"
        echo "Ensure jq is installed and in your PATH"
        exit
    fi
}

function assert-curl {
    if ! command -v curl &> /dev/null
    then
        echo "This script requires curl: https://curl.se/"
        echo "Ensure curl is installed and in your PATH"
        exit
    fi
}

function assert-user-credentials {
    # Ensure credential values are set
    source ./credentials.sh
    if [[ -z $USERNAME ]]
    then
        echo 'USERNAME must be set'
        exit
    fi

    if [[ -z $PASSWORD ]]
    then
        echo 'PASSWORD must be set'
        exit
    fi
}